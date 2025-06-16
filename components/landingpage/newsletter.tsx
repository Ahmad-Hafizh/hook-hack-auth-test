import React from "react";

export default function Newsletter() {
  return (
    <section className="w-full bg-gradient-to-r from-[#25F4EE]/10 to-[#FE2C55]/10 py-12 flex justify-center items-center">
      <div className="max-w-xl w-full px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Subscribe to our Newsletter</h2>
        <p className="mb-6 text-gray-600">Get the latest TikTok video analysis tips, feature updates, and exclusive insights delivered to your inbox.</p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25F4EE]"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-[#FE2C55] text-white font-semibold hover:bg-[#FE2C55]/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
} 