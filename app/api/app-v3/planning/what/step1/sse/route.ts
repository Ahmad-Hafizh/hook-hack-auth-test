import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { checkValidity } from "../../../utils/checkValidity";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, sessionId, step } = body;

    const { valid, response } = await checkValidity({
      sessionId,
      expectedStep: step || 3,
    });
    if (!valid) {
      return (
        response ||
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    await prisma.planningWhat.upsert({
      where: { pdca_session_id: sessionId },
      update: { product: product, selected_competitor_candidates: [] },
      create: { product: product, pdca_session_id: sessionId },
    });

    // 1. Fetch the upstream SSE stream
    const upstreamResponse = await fetch(
      "https://hook-hack.himtalks.my.id/v1/keywords/stream",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_url: product.startsWith("http")
            ? product
            : `https://${product}`,
          limit: 20,
          provider: "gemini",
          thinking_level: "low",
          enable_websearch: true,
          language: "ja",
          include_details: false,
        }),
      },
    );

    if (!upstreamResponse.body) {
      return NextResponse.json(
        { error: "No response body from upstream" },
        { status: 502 },
      );
    }

    // 2. Create a ReadableStream that pipes upstream SSE chunks to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder("utf-8");
    const upstreamReader = upstreamResponse.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await upstreamReader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.trim().startsWith("data: ")) {
                try {
                  // Validate it's parseable JSON
                  const jsonData = JSON.parse(line.substring(6));

                  if (jsonData && jsonData.candidates) {
                    try {
                      await prisma.competitorCandidatesNew.upsert({
                        where: {
                          pdca_session_id: sessionId,
                        },
                        update: { candidates: jsonData.candidates },
                        create: {
                          pdca_session_id: sessionId,
                          candidates: jsonData.candidates,
                        },
                      });
                    } catch (error) {
                      return NextResponse.json(
                        {
                          error: error,
                          message: "Error saving candidates to database",
                        },
                        { status: 500 },
                      );
                    }
                  }

                  // Forward the SSE line as-is to the client
                  controller.enqueue(encoder.encode(line + "\n\n"));
                } catch (e) {
                  return NextResponse.json(
                    {
                      error: e,
                      message: "Failed to parse JSON from upstream SSE",
                    },
                    { status: 500 },
                  );
                }
              }
            }
          }

          // Flush remaining buffer
          if (buffer.trim().startsWith("data: ")) {
            try {
              JSON.parse(buffer.substring(6));
              controller.enqueue(encoder.encode(buffer + "\n\n"));
            } catch (e) {
              console.error("Failed to parse final JSON:", buffer, e);
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    // 3. Return the stream as an SSE response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Error running step 1 SSE" },
      { status: 500 },
    );
  }
}
