import callAppV2Api from "@/config/axios/axiosAppV2";
import { prisma } from "@/config/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../../utils/checkPageStep";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, competitors, user_url } = body;

    const checkResult: { valid: boolean; response?: NextResponse } =
      await checkPageStep({
        sessionId,
        expectedPage: "what",
        whatType: "speed",
      });
    if (!checkResult.valid) {
      return checkResult.response;
    }

    const { data } = await callAppV2Api.post("/v1/key-message", {
      competitors,
      user_url,
      provider: "openai",
      language: "en",
      brand_hint: "string",
      audience: "string",
      tone: "professional",
    });

    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
