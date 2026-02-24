import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}
const rawKey = process.env.STRIPE_SECRET_KEY;
const cleanKey = rawKey.trim().replace(/[\r\n]/g, "");
console.log("[stripe] Key length:", rawKey.length, "Clean length:", cleanKey.length, "Match:", rawKey === cleanKey);
console.log("[stripe] Key starts with:", cleanKey.substring(0, 10), "... ends with:", cleanKey.substring(cleanKey.length - 5));
const stripe = new Stripe(cleanKey);

export default stripe;
