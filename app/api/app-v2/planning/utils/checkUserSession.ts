import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";

export async function checkUserSession(sessionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      valid: false,
    };
  }

  const userDb = await prisma.user.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!userDb) {
    return {
      valid: false,
    };
  }

  const session = await prisma.planningSession.findUnique({
    where: { id: sessionId, userId: userDb.id },
  });

  if (!session) {
    return {
      valid: false,
    };
  }

  return { valid: true };
}
