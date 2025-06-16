import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import axiosInstance from "@/config/axios/axios";

// SEARCH FUNCTION
export async function POST(request: Request) {
  try {
    const { search, genre } = await request.json();
    // Build dynamic where clause
    const where: any = {};
    if (genre) {
      where.search_condition = genre;
    }
    if (search) {
      where.scraping_caption = { contains: search, mode: "insensitive" };
    }
    // Query v2_format table for matching filters
    const results = await prisma.v2_format.findMany({
      where,
      take: 10, // limit for demo, adjust as needed
    });
    return NextResponse.json({ results: convertBigIntToString(results) });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
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
