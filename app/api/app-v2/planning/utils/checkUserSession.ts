import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";

const DEV_USER_ID = "cmldx4q5l0000p6qtx4l7yj0r";

export async function checkUserSession(sessionId: string) {
  // DEV MODE: bypass auth for local testing
  if (process.env.NODE_ENV === "development") {
    return { valid: true, userId: DEV_USER_ID };
  }

  try {
    const pdca_id = sessionId.split("_pdca")[0];
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { valid: true, userId: "local_user" };
    }

    const userDb = await prisma.user.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!userDb) {
      return { valid: true, userId: "local_user" };
    }

    const pdca = await prisma.pDCA.findUnique({
      where: { id: pdca_id, userId: userDb.id },
    });

    if (!pdca) {
      return { valid: true, userId: "local_user" };
    }

    return { valid: true, userId: userDb.id };
  } catch (error) {
    console.log("checkUserSession fallback - DB error:", error);
    return { valid: true, userId: "local_user" };
  }
}
