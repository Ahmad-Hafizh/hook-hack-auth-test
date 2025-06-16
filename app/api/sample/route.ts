import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req:Request) {
  try {
    const request = await req.json()    // Fetch top 3 items with highest scraping_cvr_top
    console.log("REQUEST : ", request)
    const {category, age, gender} = request;

    const results = await prisma.v2_format.findMany({
      where:{
        video_product_category: category,
        video_target_age: age,
        video_target_gender: gender,
        system_usable: { equals: true }
      },
      orderBy: { scraping_cvr_top: "asc" },
      take: 3,
    });
    return NextResponse.json({ results: results.map(convertBigIntToString) });
  } catch (error) {
    console.error("Error in GET /api/sample:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function getVideoUrl(page:any) {
  // Try main page first
  try {
    console.log("PUPPTERE")
    await page.waitForSelector('video[src]');

    // Extract the src value
    const videoUrl = await page.$eval('video[src]', (video:any) => video.getAttribute('src'));
    console.log("THIS IS SRC SRC : ", videoUrl)
    if (videoUrl) return videoUrl;
  } catch {}

  // If not found, check all iframes
  const frames = page.frames();
  for (const frame of frames) {
    try {
      const videoHandle = await frame.$('video');
      if (videoHandle) {
        const src = await frame.evaluate((el:any) => el.getAttribute('src'), videoHandle);
        if (src) return src;
      }
    } catch {}
  }
  return null;
}

function convertBigIntToString(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertBigIntToString(value),
      ])
    );
  } else if (typeof obj === "bigint") {
    return obj.toString();
  }
  return obj;
} 