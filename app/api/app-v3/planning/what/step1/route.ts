import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, sessionId } = body;

    const pdcaSession = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        competitiveMatrixesNew: true,
      },
    });
    if (!pdcaSession) {
      return NextResponse.json(
        { error: "PDCA Session not found" },
        { status: 404 },
      );
    }

    await prisma.planningWhat.upsert({
      where: { pdca_session_id: sessionId },
      update: { product: product },
      create: { product: product, pdca_session_id: sessionId },
    });

    if (pdcaSession.competitiveMatrixesNew) {
      await prisma.competitorCandidatesNew.delete({
        where: { pdca_session_id: sessionId },
      });
    }

    // const { data } = await callAppV2Api.post("/v1/keywords", {
    //   product_url: product.startsWith("http")
    //     ? product
    //     : `https://${product}.com`,
    //   brand_name: product,
    //   limit: 10,
    //   provider: "openai",
    //   language: "ja",
    //   include_details: false,
    // });

    // await prisma.competitorCandidatesNew.upsert({
    //   where: { pdca_session_id: sessionId },
    //   update: { candidates: data.candidates },
    //   create: {
    //     candidates: data.candidates,
    //     pdca_session_id: sessionId,
    //   },
    // });

    // await prisma.competitorCandidatesNew.upsert({
    //   where: { pdca_session_id: sessionId },
    //   update: { candidates: data.candidates },
    //   create: {
    //     candidates: data.candidates,
    //     pdca_session_id: sessionId,
    //   },
    // });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Error updating PDCA session" },
      { status: 500 },
    );
  }
}
