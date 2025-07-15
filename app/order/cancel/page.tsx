"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function StripeCancelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");

  const handleRetryPayment = () => {
    // You can implement retry logic here
    // For now, redirect to dashboard where user can try again
    router.push("/dashboard");
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoToApp = () => {
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-[#272727] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {/* Cancel Icon */}
        <div className="text-yellow-500 text-6xl mb-4">❌</div>

        {/* Cancel Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-300 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>

        {/* Session Info */}
        {sessionId && (
          <div className="bg-[#1f1f1f] rounded-lg p-4 mb-6 text-left">
            <h2 className="text-xl font-semibold text-white mb-3">
              Session Information
            </h2>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Session ID:</span>
                <span className="font-mono text-sm">{sessionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-yellow-400 font-semibold">Cancelled</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetryPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={handleGoToDashboard}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleGoToApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Continue with App
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-[#1f1f1f] rounded-lg">
          <h3 className="text-white font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-400 text-sm mb-3">
            If you're experiencing issues with payments, please contact our
            support team.
          </p>
          <div className="text-gray-500 text-sm">
            <p>• No charges were made to your account</p>
            <p>• You can try the payment again anytime</p>
            <p>• Your account credits remain unchanged</p>
          </div>
        </div>
      </div>
    </div>
  );
}
