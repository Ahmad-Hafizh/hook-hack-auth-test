import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  console.log(
    "[API /api/project/create-new] - POST request received at:",
    new Date().toISOString()
  );
  try {
    console.log("[create-new] Checking user authentication...");
    const authData = getAuth(req);
    const userId = authData?.userId;

    if (!userId) {
      console.error("[create-new] Unauthorized: No userId found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(`[create-new] Authenticated user: ${userId}`);

    console.log("[create-new] Starting database transaction...");
    const newProject = await prisma.$transaction(async (tx) => {
      console.log(`[create-new] Finding user ${userId} in transaction.`);
      const user = await tx.user.findUnique({
        where: { userId },
      });

      if (!user) {
        console.error(`[create-new] User ${userId} not found in database.`);
        throw new Error("User not found");
      }
      console.log(`[create-new] Found user. Current credit: ${user.credit}`);

      if (user.credit < 1) {
        console.warn(
          `[create-new] User ${userId} has insufficient credits (${user.credit}).`
        );
        throw new Error("Insufficient credits");
      }
      console.log(`[create-new] User ${userId} has sufficient credits.`);

      console.log(`[create-new] Deducting 1 credit from user ${userId}.`);
      await tx.user.update({
        where: { userId },
        data: { credit: { decrement: 1 } },
      });
      console.log(`[create-new] Credit deducted successfully.`);

      console.log(`[create-new] Creating empty project for user ${userId}.`);
      const project = await tx.project.create({
        data: {
          system_userid: userId,
          userinput: {}, // Start with empty userinput
        },
      });
      console.log(`[create-new] Project created with ID: ${project.id}.`);

      return project;
    });
    console.log("[create-new] Transaction completed successfully.");

    return NextResponse.json({
      success: true,
      projectId: newProject.id.toString(),
    });
  } catch (error: any) {
    console.error("[create-new] Error creating new project:", error);

    if (error.message === "Insufficient credits") {
      return NextResponse.json(
        { error: "Not enough credits to create a new project." },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
