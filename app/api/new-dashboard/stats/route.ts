import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getUser } from "@/app/api/app-v3/planning/utils/getUser";
import stripe from "@/lib/stripe/stripe";
import { getPlanByPriceId } from "@/lib/stripe/plans";

export async function GET() {
  try {
    const { userDbId, userId } = await getUser();
    if (!userDbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalProjects,
      totalVideos,
      user,
      latestProjects,
      latestVideos,
    ] = await Promise.all([
      prisma.pDCA.count({ where: { userId: userDbId } }),
      prisma.renderedVideo.count({
        where: {
          url: { not: null },
          PDCA_Session: {
            pdca: { userId: userDbId },
          },
        },
      }),
      prisma.user.findUnique({
        where: { id: userDbId },
        select: { credit: true, email: true },
      }),
      prisma.pDCA.findMany({
        where: { userId: userDbId },
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: {
          id: true,
          name: true,
          updatedAt: true,
        },
      }),
      prisma.renderedVideo.findMany({
        where: {
          url: { not: null },
          PDCA_Session: {
            pdca: { userId: userDbId },
          },
        },
        orderBy: {
          PDCA_Session: {
            createdAt: "desc",
          },
        },
        take: 3,
        select: {
          id: true,
          url: true,
          PDCA_Session: {
            select: {
              name: true,
              createdAt: true,
              pdca: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    // Build subscription info from Stripe if user has email
    let subscription: {
      status: string;
      planNameJa: string | null;
      planType: string | null;
      plans: { planKey: string; planNameJa: string; isSupportPlan: boolean }[];
    } = { status: "Free", planNameJa: null, planType: null, plans: [] };

    if (user?.email) {
      try {
        const customers = await stripe.customers.list({
          email: user.email,
          limit: 1,
        });

        if (customers.data.length > 0) {
          const activeSubs = await stripe.subscriptions.list({
            customer: customers.data[0].id,
            status: "active",
            limit: 10,
          });

          if (activeSubs.data.length > 0) {
            const plans = activeSubs.data.map((sub) => {
              const priceId = sub.items.data[0]?.price?.id;
              const plan = priceId ? getPlanByPriceId(priceId) : undefined;
              return {
                planKey: plan?.key || "unknown",
                planNameJa: plan?.nameJa || "不明なプラン",
                isSupportPlan: plan?.key === "company_support",
              };
            });

            const toolPlan = plans.find((p) => !p.isSupportPlan);
            const planType = toolPlan?.planKey?.startsWith("vendor")
              ? "vendor"
              : "company";

            subscription = {
              status: "Active",
              planNameJa: toolPlan?.planNameJa || plans[0]?.planNameJa || null,
              planType,
              plans,
            };
          }
        }
      } catch (stripeError) {
        console.error("Error fetching Stripe subscription for stats:", stripeError);
      }
    }

    return NextResponse.json({
      totalProjects,
      totalVideos,
      creditsRemaining: user?.credit ?? 0,
      subscription,
      latestProjects: latestProjects.map((p) => ({
        id: p.id,
        name: p.name,
        updatedAt: p.updatedAt,
      })),
      latestVideos: latestVideos.map((v) => ({
        id: v.id,
        url: v.url,
        projectName: v.PDCA_Session.pdca.name,
        sessionName: v.PDCA_Session.name,
        createdAt: v.PDCA_Session.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
