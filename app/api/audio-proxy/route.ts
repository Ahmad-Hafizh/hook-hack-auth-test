import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  console.log("Audio proxy called with URL:", req.nextUrl.toString());

  try {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
      console.log("No URL parameter provided");
      return NextResponse.json({ error: "URL parameter required" }, { status: 400 });
    }

    console.log("Decoded URL:", decodeURIComponent(url));

    // Extract file ID from Google Drive URL
    // Supports both formats:
    // - https://drive.google.com/uc?export=download&id=FILE_ID
    // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    let fileId: string | null = null;

    // Try /file/d/FILE_ID/ format first
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch && fileMatch[1]) {
      fileId = fileMatch[1];
    } else {
      // Try id=FILE_ID format
      const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }

    if (!fileId) {
      console.log("Could not extract file ID from URL");
      return NextResponse.json({ error: "Invalid Google Drive URL" }, { status: 400 });
    }
    console.log("Extracted file ID:", fileId);

    // Use the direct download URL format
    const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const response = await fetch(directUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });

    console.log("Google Drive response status:", response.status);

    if (!response.ok) {
      console.log("Failed to fetch from Google Drive:", response.statusText);
      return NextResponse.json(
        { error: `Failed to fetch audio: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("Content-Type") || "audio/mpeg";
    console.log("Content-Type from Google Drive:", contentType);

    // Check if Google Drive returned HTML (usually means file not found or access denied)
    if (contentType.includes("text/html")) {
      console.log("Google Drive returned HTML - file may not be accessible");
      return NextResponse.json(
        { error: "Audio file not accessible - may be private or deleted" },
        { status: 404 }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    console.log("Audio buffer size:", audioBuffer.byteLength);

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(audioBuffer.byteLength),
        "Cache-Control": "public, max-age=31536000",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Audio proxy error:", error);
    return NextResponse.json({ error: "Failed to proxy audio" }, { status: 500 });
  }
}
