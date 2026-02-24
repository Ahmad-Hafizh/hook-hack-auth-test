import callAppV2Api from "@/config/axios/axiosAppV2";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, exclude_domains } = body;

    const session = await prisma.pDCASession.findUnique({
      where: { id: sessionId },
      select: {
        planning_what: {
          select: {
            selected_keyword: true,
          },
        },
      },
    });

    const websitesResp = await callAppV2Api.post("/v1/websites", {
      keywords: [session?.planning_what?.selected_keyword],
      limit: 6,
      exclude_domains: exclude_domains || [],
      lang: "ja",
    });
    const websites = websitesResp?.data;

    if (!websites || !Array.isArray(websites.websites)) {
      throw new Error("Invalid websites response from v1/websites");
    }

    // Filter and validate URLs
    const urls = websites.websites
      .map((website: any) => website.url)
      .filter((url: string) => {
        if (!url) return false;
        // Validate URL format
        try {
          new URL(url);
          return true;
        } catch {
          console.log("Invalid URL filtered out:", url);
          return false;
        }
      });

    if (urls.length === 0) {
      throw new Error(
        "No valid website URLs returned for screenshot generation",
      );
    }

    // call screenshots endpoint - try batch first, then fallback to individual
    let visuals: any = null;

    // try {
    //   // Screenshot API accepts max 5 URLs per batch
    //   const allItems: any[] = [];
    //   for (let i = 0; i < urls.length; i += 5) {
    //     const batch = urls.slice(i, i + 5);
    //     const visualsResp = await callAppV2Api.post("/v1/websites/screenshot", {
    //       urls: batch,
    //       language: "ja",
    //     });
    //     console.log("Screenshot response status:", visualsResp?.status);
    //     if (visualsResp?.data?.items) {
    //       allItems.push(...visualsResp.data.items);
    //     }
    //   }
    //   visuals = { items: allItems };
    // } catch (batchError: any) {
    //   console.log("Batch screenshot failed, trying individual URLs...");
    //   console.log(
    //     "Batch error:",
    //     batchError.response?.data || batchError.message,
    //   );
    // }

    // // Fallback: try each URL individually
    // const items: any[] = [];
    // for (const url of urls) {
    //   try {
    //     const singleResp = await callAppV2Api.post("/v1/websites/screenshot", {
    //       urls: [url],
    //       language: "ja",
    //     });
    //     if (singleResp?.data?.items?.[0]) {
    //       items.push(singleResp.data.items[0]);
    //     }
    //   } catch (singleError: any) {
    //     console.log(
    //       `Failed to screenshot ${url}:`,
    //       singleError.response?.data || singleError.message,
    //     );
    //     // Continue with other URLs
    //   }
    // }

    // if (items.length > 0) {
    //   visuals = { items };
    // }

    // if (
    //   !visuals ||
    //   !Array.isArray(visuals.items) ||
    //   visuals.items.length === 0
    // ) {
    //   throw new Error(
    //     "No screenshots could be generated from the returned URLs",
    //   );
    // }

    // Build visuals array to return
    const visualsUrls = visuals.items.map((item: any) => ({
      url: item.url,
      screenshot_url: item.screenshot?.link ?? null,
      title: item.title ?? null,
      meta_description: item.meta_description ?? null,
      pdca_session_id: sessionId,
    }));

    // TODO: keyVisual model has been removed from schema.
    // Key visuals data is returned in the response but no longer persisted to DB.

    return NextResponse.json(
      { message: "Success", key_visuals: visualsUrls },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("error : ", error);
    // Log detailed error info for debugging
    if (error.response) {
      console.log("Error response status:", error.response.status);
      console.log(
        "Error response data:",
        JSON.stringify(error.response.data, null, 2),
      );
    }
    return NextResponse.json(
      { error: error.response?.data?.message || error.message || "Error" },
      { status: 500 },
    );
  }
}
