import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/config/prisma/prisma";
import { sendOnboardingEmailWithResend } from "@/lib/resendService";

// Log the webhook endpoint address
console.log("[Clerk Webhook] Listening at /api/webhooks/clerk");

async function validateRequest(request: Request) {
  console.log("[Clerk Webhook] Starting request validation...");

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("[Clerk Webhook] Headers received:", {
    svix_id: svix_id ? "present" : "missing",
    svix_timestamp: svix_timestamp ? "present" : "missing",
    svix_signature: svix_signature ? "present" : "missing",
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("[Clerk Webhook] Missing required headers:", {
      svix_id,
      svix_timestamp,
      svix_signature,
    });
    throw new Error("Error occured -- no svix headers");
  }

  // Get the body
  const payload = await request.text();
  console.log("[Clerk Webhook] Request body length:", payload.length);
  console.log(
    "[Clerk Webhook] Request body preview:",
    payload.substring(0, 200) + "..."
  );

  // Create a new Svix instance with your secret.
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  console.log("[Clerk Webhook] Webhook secret present:", !!webhookSecret);

  if (!webhookSecret) {
    console.error("[Clerk Webhook] CLERK_WEBHOOK_SECRET is not set!");
    throw new Error("Webhook secret not configured");
  }

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    console.log("[Clerk Webhook] Attempting to verify webhook signature...");
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("[Clerk Webhook] Webhook signature verified successfully");
    console.log("[Clerk Webhook] Event type:", evt.type);
    console.log(
      "[Clerk Webhook] Event data keys:",
      Object.keys(evt.data || {})
    );
  } catch (err) {
    console.error("[Clerk Webhook] Error verifying webhook:", err);
    throw new Error("Error occured");
  }

  return evt;
}

export async function POST(request: Request) {
  console.log(
    "[Clerk Webhook] POST request received at:",
    new Date().toISOString()
  );
  console.log("[Clerk Webhook] Request URL:", request.url);
  console.log("[Clerk Webhook] Request method:", request.method);

  // Log all headers to debug redirect issues
  const headersList = await headers();
  console.log(
    "[Clerk Webhook] All request headers:",
    Object.fromEntries(headersList.entries())
  );

  try {
    console.log("[Clerk Webhook] Starting webhook processing...");

    const evt = await validateRequest(request);
    console.log(
      "[Clerk Webhook] Request validated, processing event type:",
      evt.type
    );

    // Handle user events
    if (evt.type === "user.created" || evt.type === "user.updated") {
      console.log("[Clerk Webhook] Processing user event:", evt.type);

      const userData = evt.data as any; // Type assertion for user data
      console.log("[Clerk Webhook] User data received:", {
        id: userData.id,
        email_addresses_count: userData.email_addresses?.length || 0,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone_numbers_count: userData.phone_numbers?.length || 0,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      });

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

      console.log("[Clerk Webhook] Extracted user info:", {
        id,
        email,
        firstName,
        lastName,
      });

      // Handle phone number - set to null if empty or undefined
      let phoneNumber = null;
      if (
        phone_numbers &&
        phone_numbers.length > 0 &&
        phone_numbers[0]?.phone_number
      ) {
        phoneNumber = phone_numbers[0].phone_number;
        console.log("[Clerk Webhook] Phone number found:", phoneNumber);
      } else {
        console.log("[Clerk Webhook] No phone number found, setting to null");
      }

      if (evt.type === "user.created") {
        console.log("[Clerk Webhook] Creating new user in database...");

        try {
          const newUser = await prisma.user.create({
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
          console.log(
            "[Clerk Webhook] User created successfully in database:",
            {
              userId: newUser.userId,
              email: newUser.email,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
            }
          );
        } catch (dbError) {
          console.error(
            "[Clerk Webhook] Database error creating user:",
            dbError
          );
          throw dbError;
        }

        // Send onboarding email
        if (email) {
          console.log(
            "[Clerk Webhook] Attempting to send onboarding email to:",
            email
          );
          try {
            const userName = firstName || lastName || "User";
            console.log(
              "[Clerk Webhook] Using display name for email:",
              userName
            );

            await sendOnboardingEmailWithResend(email, userName);
            console.log(
              "[Clerk Webhook] Onboarding email sent successfully to:",
              email
            );
          } catch (emailError) {
            console.error(
              "[Clerk Webhook] Failed to send onboarding email to",
              email,
              ":",
              emailError
            );
            // Don't throw here - we don't want to fail the webhook if email fails
          }
        } else {
          console.log(
            "[Clerk Webhook] No email address found, skipping onboarding email"
          );
        }
      } else if (evt.type === "user.updated") {
        console.log("[Clerk Webhook] Updating existing user in database...");

        try {
          const updatedUser = await prisma.user.update({
            where: { userId: id },
            data: {
              firstName,
              lastName,
              email,
              phoneNumber,
              updatedAt: new Date(updated_at),
            },
          });
          console.log(
            "[Clerk Webhook] User updated successfully in database:",
            {
              userId: updatedUser.userId,
              email: updatedUser.email,
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
            }
          );
        } catch (dbError) {
          console.error(
            "[Clerk Webhook] Database error updating user:",
            dbError
          );
          throw dbError;
        }
      }
    }

    // Handle user deletion
    if (evt.type === "user.deleted") {
      console.log("[Clerk Webhook] Processing user deletion...");

      const userData = evt.data as any;
      const { id } = userData;

      console.log("[Clerk Webhook] Deleting user with ID:", id);

      try {
        await prisma.user.delete({
          where: { userId: id },
        });
        console.log(
          "[Clerk Webhook] User deleted successfully from database:",
          id
        );
      } catch (dbError) {
        console.error("[Clerk Webhook] Database error deleting user:", dbError);
        throw dbError;
      }
    }

    console.log("[Clerk Webhook] Webhook processing completed successfully");
    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("[Clerk Webhook] Webhook processing failed:", error);
    console.error(
      "[Clerk Webhook] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return new Response("Webhook error", { status: 400 });
  }
}

export async function GET() {
  console.log(
    "[Clerk Webhook] GET request received at:",
    new Date().toISOString()
  );
  return new Response("GET OK", { status: 200 });
}
