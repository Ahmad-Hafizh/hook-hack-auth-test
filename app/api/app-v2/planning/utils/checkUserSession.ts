import { prisma } from "@/config/prisma/prisma";
import { createClient } from "@/lib/supabase/server";

export async function checkUserSession(sessionId: string) {
  const pdca_id = sessionId.split("_pdca")[0];
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

  const pdca = await prisma.pDCA.findUnique({
    where: { id: pdca_id, userId: userDb.id },
  });

  if (!pdca) {
    return {
      valid: false,
    };
  }

  return { valid: true };
}
