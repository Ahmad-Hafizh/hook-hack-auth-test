import { NextRequest, NextResponse } from "next/server";
import { checkPageStep } from "../../utils/checkPageStep";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId } = body;

    const checkResult: { valid: boolean; response?: NextResponse } =
      await checkPageStep(sessionId, "how");
    if (!checkResult.valid) {
      return checkResult.response;
    }

    // Step 3 doesn't require an API call, just validation
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
