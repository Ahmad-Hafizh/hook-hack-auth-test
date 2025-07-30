import { NextResponse } from "next/server";
import stripe from "@/lib/stripe/stripe";

export async function GET() {
  try {
    // Get product IDs from environment variables
    const regularProductId = process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRODUCT_ID;
    const testProductId = process.env.NEXT_PUBLIC_STRIPE_TEST_PRODUCT_ID;

    const products = [];

    // Retrieve Regular Membership product (Subscription)
    if (regularProductId) {
      try {
        const regularProduct = await stripe.products.retrieve(regularProductId);
        const regularPrices = await stripe.prices.list({
          product: regularProductId,
          active: true,
        });

        if (regularPrices.data.length > 0) {
          const regularPrice = regularPrices.data[0];
          console.log("🔍 Regular Price details:", {
            id: regularPrice.id,
            type: regularPrice.type,
            recurring: regularPrice.recurring,
            currency: regularPrice.currency,
            unit_amount: regularPrice.unit_amount,
          });

          // Handle JPY differently - it doesn't use cents
          const price =
            regularPrice.currency === "jpy"
              ? regularPrice.unit_amount || 0
              : (regularPrice.unit_amount || 0) / 100;

          // Determine mode based on price type
          const mode = regularPrice.recurring ? "subscription" : "payment";

          products.push({
            id: regularProduct.id,
            name: regularProduct.name || "Regular Membership",
            description:
              regularProduct.description || "Full access to all features",
            price: price,
            currency: (regularPrice.currency || "jpy").toUpperCase(),
            priceId: regularPrice.id,
            mode: mode,
            interval: regularPrice.recurring?.interval || "month",
            intervalCount: regularPrice.recurring?.interval_count || 1,
          });
          console.log(
            `✅ Retrieved Regular Membership (${mode}): ¥${price}/${regularPrice.recurring?.interval || "month"}`
          );
        }
      } catch (error) {
        console.error("Error retrieving regular product:", error);
      }
    }

    // Retrieve Test Package product (One-time)
    if (testProductId) {
      try {
        const testProduct = await stripe.products.retrieve(testProductId);
        const testPrices = await stripe.prices.list({
          product: testProductId,
          active: true,
        });

        if (testPrices.data.length > 0) {
          const testPrice = testPrices.data[0];
          console.log("🔍 Test Price details:", {
            id: testPrice.id,
            type: testPrice.type,
            recurring: testPrice.recurring,
            currency: testPrice.currency,
            unit_amount: testPrice.unit_amount,
          });

          // Handle JPY differently - it doesn't use cents
          const price =
            testPrice.currency === "jpy"
              ? testPrice.unit_amount || 0
              : (testPrice.unit_amount || 0) / 100;

          // Determine mode based on price type
          const mode = testPrice.recurring ? "subscription" : "payment";

          products.push({
            id: testProduct.id,
            name: testProduct.name || "Test Package",
            description:
              testProduct.description || "Limited access for testing",
            price: price,
            currency: (testPrice.currency || "jpy").toUpperCase(),
            priceId: testPrice.id,
            mode: mode,
          });
          console.log(`✅ Retrieved Test Package (${mode}): ¥${price}`);
        }
      } catch (error) {
        console.error("Error retrieving test product:", error);
      }
    }

    if (products.length === 0) {
      return NextResponse.json(
        {
          error:
            "No products found. Please check your product IDs in environment variables.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      products,
      message: `Retrieved ${products.length} products from Stripe`,
    });
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { error: "Failed to retrieve products from Stripe" },
      { status: 500 }
    );
  }
}
