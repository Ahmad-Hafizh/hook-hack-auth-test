import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { checkValidity } from "../../../utils/checkValidity";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, valueOrganization, selectedValueOrganization, step } =
      await req.json();

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
        selected_value_organization: selectedValueOrganization,
        selected_desire_tobe_organization: [],
      },
      select: {
        selected_competitor_matrix: true,
      },
    });

    await prisma.valueOrganizationsNew.upsert({
      where: { pdca_session_id: sessionId },
      update: { value_organizations: valueOrganization },
      create: {
        value_organizations: valueOrganization,
        pdca_session_id: sessionId,
      },
    });

    const competitive_matrix = await prisma.competitiveMatrixesNew.findUnique({
      where: { pdca_session_id: sessionId },
    });

    const matrixKey = planning_what?.selected_competitor_matrix || "user";

    const selectedMatrixData: any =
      matrixKey === "user"
        ? competitive_matrix?.user
        : competitive_matrix?.suggestion;

    const own_lp_summary = `${selectedMatrixData.key_message}, ${selectedMatrixData.strong_points.join(", ")}`;

    const competitors_summary = competitive_matrix?.competitor?.map(
      (c: any) => `${c.key_message}, ${c.strong_points.join(", ")}`,
    );

    const upstreamResponse = await fetch(
      "https://hook-hack.himtalks.my.id/v1/desire-organization",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId || "",
          "X-PDCA-Session-ID": sessionId || "",
        },
        body: JSON.stringify({
          own_lp_summary: own_lp_summary,
          competitors_summary: competitors_summary,
          values_12: valueOrganization,
          selected_values_6: selectedValueOrganization,
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
    return NextResponse.json(
      { error: error, message: "internal server error" },
      { status: 500 },
    );
  }
}
