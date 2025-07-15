"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import stripe from "@/lib/stripe/stripe";

export default function StripeSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sessionId = searchParams.get("session_id");

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoToApp = () => {
    router.push("/app");
  };

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    // Fetch session details from Stripe
    const fetchSessionDetails = async () => {
      try {
        const sessionFetch = await stripe.checkout.sessions.retrieve(sessionId);

        if (sessionFetch.payment_status !== "paid") {
          setError("Payment was not completed successfully");
          setLoading(false);
          return;
        }

        // Set the session data
        setSessionData(sessionFetch);
      } catch (err: any) {
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#272727] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#272727] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Payment Error</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={handleGoToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#272727] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {/* Success Icon */}
        <div className="text-green-500 text-6xl mb-4">✅</div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-300 mb-6">
          Thank you for your purchase. Your credits have been added to your
          account.
        </p>

        {/* Order Details */}
        {sessionData && (
          <div className="bg-[#1f1f1f] rounded-lg p-4 mb-6 text-left">
            <h2 className="text-xl font-semibold text-white mb-3">
              Order Details
            </h2>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono text-sm">
                  {sessionData.id || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold text-green-400">
                  ${(sessionData.amount_total / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-400 font-semibold">
                  {sessionData.payment_status || "Paid"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="text-blue-400 font-semibold">
                  {sessionData.payment_method_types?.[0] || "Card"}
                </span>
              </div>
              {sessionData.customer_details && (
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="text-gray-400">
                    {sessionData.customer_details.email || "N/A"}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoToApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start Creating Content
          </button>
          <button
            onClick={handleGoToDashboard}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm mt-6">
          You will receive a confirmation email shortly with your receipt.
        </p>
      </div>
    </div>
  );
}
