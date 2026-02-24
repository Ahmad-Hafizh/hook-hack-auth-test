import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { userId: null, userDbId: null };
    }

    const userDb = await prisma.user.findUnique({
      where: { userId: user?.id },
      select: { id: true, userId: true },
    });

    if (!userDb) {
      return { userId: null, userDbId: null };
    }

    return { userId: userDb.userId, userDbId: userDb.id };
  } catch (error) {
    return { userId: null, userDbId: null };
  }
}
