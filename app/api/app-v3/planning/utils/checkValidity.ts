import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface CheckValidityParams {
  sessionId: string;
  expectedStep?: number;
}

interface CheckValidityResult {
  valid: boolean;
  response?: NextResponse;
  userId?: string;
  whatType?: "speed" | "skip" | "scratch";
}

export async function checkValidity({
  sessionId,
  expectedStep,
}: CheckValidityParams): Promise<CheckValidityResult> {
  try {
    const pdca_id = sessionId.split("_pdca")[0];

    // 1. Check user authentication
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        valid: false,
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }

    // 2. Check user exists in database
    const userDb = await prisma.user.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!userDb) {
      return {
        valid: false,
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }

    // 3. Check PDCA exists and belongs to user
    const pdca = await prisma.pDCA.findUnique({
      where: { id: pdca_id, userId: userDb.id },
      select: { id: true },
    });

    if (!pdca) {
      return {
        valid: false,
        response: NextResponse.json(
          { error: "PDCA not found" },
          { status: 404 },
        ),
      };
    }

    if (expectedStep) {
      // 4. Check session exists and belongs to the PDCA
      const session = await prisma.pDCASession.findUnique({
        where: { id: sessionId, pdca_id: pdca_id },
        select: {
          id: true,
          step: true,
          isChoosingSpeed: true,
          isHavingCompetitorUrls: true,
        },
      });

      if (!session) {
        return {
          valid: false,
          response: NextResponse.json(
            { error: "Session not found" },
            { status: 404 },
          ),
        };
      }

      const currentStep = session.step ?? 1;

      // 5. Validate step based on session state
      // If user is choosing speed mode and trying to access steps beyond 6
      if (session.isChoosingSpeed && expectedStep > 6) {
        await prisma.pDCASession.update({
          where: { id: sessionId },
          data: { step: 6 },
        });

        return {
          valid: false,
          response: NextResponse.json(
            {
              error: "Invalid step for speed mode",
              step: 6,
            },
            { status: 400 },
          ),
        };
      }

      // If user has competitor URLs and trying to access steps beyond 12
      if (session.isHavingCompetitorUrls && expectedStep > 12) {
        await prisma.pDCASession.update({
          where: { id: sessionId },
          data: { step: 12 },
        });

        return {
          valid: false,
          response: NextResponse.json(
            {
              error: "Invalid step for competitor mode",
              step: 12,
            },
            { status: 400 },
          ),
        };
      }

      // If user is not choosing speed and has no competitor URLs, max step is 14
      if (
        !session.isChoosingSpeed &&
        !session.isHavingCompetitorUrls &&
        expectedStep > 14
      ) {
        await prisma.pDCASession.update({
          where: { id: sessionId },
          data: { step: 14 },
        });

        return {
          valid: false,
          response: NextResponse.json(
            {
              error: "Invalid step for standard mode",
              step: 14,
            },
            { status: 400 },
          ),
        };
      }

      // 6. Check if user is trying to skip ahead (can't go to step N if not at step N-1 or N)
      if (expectedStep > currentStep + 1) {
        return {
          valid: false,
          response: NextResponse.json(
            {
              error: "Cannot skip steps",
              currentStep: currentStep,
              requestedStep: expectedStep,
            },
            { status: 400 },
          ),
        };
      }

      // 7. Check if step matches expected (optional: allow going back)
      if (currentStep !== expectedStep && expectedStep > currentStep) {
        return {
          valid: false,
          response: NextResponse.json(
            {
              error: "Invalid session state",
              currentStep: currentStep,
              requestedStep: expectedStep,
              redirect: `${process.env.NEXT_PUBLIC_APP_V2_URL}/app-v3/projects`,
            },
            { status: 400 },
          ),
        };
      }

      return {
        valid: true,
        userId: userDb.id,
        whatType: session.isChoosingSpeed
          ? "speed"
          : session.isHavingCompetitorUrls
            ? "skip"
            : "scratch",
      };
    } else {
      return {
        valid: true,
        userId: userDb?.id,
        whatType: "scratch",
      };
    }
  } catch (error) {
    return {
      valid: false,
      response: NextResponse.json(
        { error: "Internal server error", details: error },
        { status: 500 },
      ),
    };
  }
}

// Helper to update step after successful operation
export async function advanceStep(sessionId: string, nextStep: number) {
  return prisma.pDCASession.update({
    where: { id: sessionId },
    data: { step: nextStep },
  });
}
