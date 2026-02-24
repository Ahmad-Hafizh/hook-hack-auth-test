import { NextResponse } from "next/server";
import { getUser } from "../getUser";
import callAppV2Api from "@/config/axios/axiosAppV2";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const slot = formData.get("slot") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!slot) {
      return NextResponse.json({ error: "No slot specified" }, { status: 400 });
    }

    const user = await getUser();
    if (!user.userDbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data } = await callAppV2Api.post("/v1/assets/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-User-ID": user.userDbId,
      },
    });

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
