import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
