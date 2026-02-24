import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";

const DEV_USER_ID = "cmldx4q5l0000p6qtx4l7yj0r";

export async function getUser() {
  // DEV MODE: bypass auth for local testing
  if (process.env.NODE_ENV === "development") {
    return { userId: DEV_USER_ID, userDbId: DEV_USER_ID };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("user supabase", user);

    const userDb = await prisma.user.findUnique({
      where: { userId: user?.id },
      select: { id: true, userId: true },
    });

    if (!userDb) {
      return { userId: user?.id, userDbId: "local_user_db" };
    }

    return { userId: userDb.userId, userDbId: userDb.id };
  } catch (error) {
    console.log("getUser fallback - DB error:", error);
    return { userId: "local_user", userDbId: "local_user_db" };
  }
}
