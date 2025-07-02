import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "../../../../lib/generated/prisma";

const prisma = new PrismaClient();

// Log the webhook endpoint address
console.log("[Clerk Webhook] Listening at /api/webhooks/clerk");

async function validateRequest(request: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error("Error occured -- no svix headers");
  }

  // Get the body
  const payload = await request.text();

  // Log the incoming request
  console.log("[Clerk Webhook] Incoming request:");
  console.log("Method:", request.method);
  console.log("Headers:", {
    svix_id,
    svix_timestamp,
    svix_signature,
  });
  console.log("Body:", payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    throw new Error("Error occured");
  }

  return evt;
}

export async function POST(request: Request) {
  try {
    const evt = await validateRequest(request);

    // Handle user events
    if (evt.type === "user.created" || evt.type === "user.updated") {
      const userData = evt.data as any; // Type assertion for user data
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        phone_numbers,
        created_at,
        updated_at,
      } = userData;

      const email = email_addresses?.[0]?.email_address || "";
      const firstName = first_name || "";
      const lastName = last_name || "";

      // Handle phone number - set to null if empty or undefined
      let phoneNumber = null;
      if (
        phone_numbers &&
        phone_numbers.length > 0 &&
        phone_numbers[0]?.phone_number
      ) {
        phoneNumber = phone_numbers[0].phone_number;
      }

      if (evt.type === "user.created") {
        // Create new user
        await prisma.user.create({
          data: {
            userId: id,
            firstName,
            lastName,
            email,
            phoneNumber,
            tiktokUsername: null, // Will be set later by user
            credit: 0, // Default credit for new users
          },
        });
        console.log(`User created: ${id}`);
      } else if (evt.type === "user.updated") {
        // Update existing user
        await prisma.user.update({
          where: { userId: id },
          data: {
            firstName,
            lastName,
            email,
            phoneNumber,
            updatedAt: new Date(updated_at),
          },
        });
        console.log(`User updated: ${id}`);
      }
    }

    // Handle user deletion
    if (evt.type === "user.deleted") {
      const userData = evt.data as any;
      const { id } = userData;

      await prisma.user.delete({
        where: { userId: id },
      });
      console.log(`User deleted: ${id}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook error", { status: 400 });
  }
}

export async function GET() {
  console.log("[Clerk Webhook] GET request received!");
  return new Response("GET OK", { status: 200 });
}
