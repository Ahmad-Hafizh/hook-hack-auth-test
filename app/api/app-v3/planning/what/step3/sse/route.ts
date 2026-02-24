import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkValidity } from "../../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, competitiveMatrix, selectedCompetitiveMatrix, step } =
      body;

    const { valid, userId, response } = await checkValidity({
      sessionId,
      expectedStep: step || 5,
    });
    if (!valid) {
      return (
        response ||
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    const planning_what = await prisma.planningWhat.update({
      where: { pdca_session_id: sessionId },
      data: {
        selected_competitor_matrix: selectedCompetitiveMatrix,
        selected_value_organization: undefined,
      },
      select: {
        product: true,
      },
    });

    // Don't return 404 for local sessions
    await prisma.competitiveMatrixesNew.upsert({
      where: { pdca_session_id: sessionId },
      update: {
        user: competitiveMatrix.user,
        suggestion: competitiveMatrix.suggestion,
        competitor: competitiveMatrix.competitors,
      },
      create: {
        pdca_session_id: sessionId,
        user: competitiveMatrix.user,
        suggestion: competitiveMatrix.suggestion,
        competitor: competitiveMatrix.competitors,
      },
    });

    const selectedSource =
      selectedCompetitiveMatrix === "user"
        ? competitiveMatrix.user
        : competitiveMatrix.suggestion;

    if (!selectedSource) {
      return NextResponse.json(
        {
          error: `No data found for selected matrix: ${selectedCompetitiveMatrix}`,
        },
        { status: 400 },
      );
    }

    const formattedCompetitors = (competitiveMatrix.competitors || []).map(
      (c: any) => ({
        url: c.url || "",
        key_message: c.key_message,
        strong_points: c.strong_points,
      }),
    );

    const upstreamResponse = await fetch(
      "https://hook-hack.himtalks.my.id/v1/value-organization",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId || "",
          "X-PDCA-Session-ID": sessionId || "",
        },
        body: JSON.stringify({
          user: {
            url: planning_what.product?.startsWith("http")
              ? planning_what.product
              : `http://${planning_what.product?.replace(/\s/g, "")}`,
            key_message: selectedSource.key_message,
            strong_points: selectedSource.strong_points,
          },
          competitors: formattedCompetitors,
          provider: "openai",
          language: "ja",
          reasoning_effort: "high",
        }),
      },
    );

    if (!upstreamResponse.body) {
      return NextResponse.json(
        { error: "No response body from upstream" },
        { status: 502 },
      );
    }

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
                  JSON.parse(line.substring(6));
                  controller.enqueue(encoder.encode(line + "\n\n"));
                } catch (error) {
                  return NextResponse.json(
                    { error: "Invalid JSON from upstream" },
                    { status: 502 },
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

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[step3/sse] Error:", error);
    return NextResponse.json(
      { error: "Error", details: String(error) },
      { status: 500 },
    );
  }
}
