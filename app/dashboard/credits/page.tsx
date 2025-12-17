"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";
import { useState, useEffect } from "react";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const navMain = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    isActive: false,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Folder,
    isActive: false,
  },
  {
    title: "Buy Credit",
    url: "/dashboard/credits",
    icon: CreditCard,
    isActive: true,
  },
  {
    title: "Transaction",
    url: "/dashboard/transactions",
    icon: List,
    isActive: false,
  },
];

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  priceId: string;
  mode: "subscription" | "payment";
  interval?: string;
  intervalCount?: number;
}

export default function CreditsPage() {
  // Environment variables for products
  const REGULAR_PRODUCT_ID =
    process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRODUCT_ID || "";
  const TEST_PRODUCT_ID = process.env.NEXT_PUBLIC_STRIPE_TEST_PRODUCT_ID || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch product information from Stripe
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/stripe/products", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          console.log("✅ Products loaded:", data.message);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch products:", errorData.error);
          setError(
            errorData.error ||
              "Failed to load products. Please check your Stripe configuration."
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = async (
    priceId: string,
    productName: string,
    mode: "subscription" | "payment"
  ) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(`Failed to create Stripe session for ${productName}.`);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TestboardLayout navMain={navMain} documentsTitle="Buy Credits">
      <div className="flex flex-col gap-4 py-8 md:gap-6 md:py-10 px-7 bg-[#0f0f0f] min-h-screen text-white">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Buy Credits
            </h1>
            <p className="text-muted-foreground text-gray-400">
              Choose a package that fits your needs
            </p>
          </div>
        </div>

        {/* Credits Content */}
        <div className="px-4 lg:px-6">
          {loadingProducts ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fe2858]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-6 border border-[#361a20] rounded-lg bg-[#1a1a1a] hover:border-[#fe2858] transition-colors"
                >
                  <h2 className="text-xl font-semibold mb-2 text-white">
                    {product.name}
                  </h2>
                  <p className="text-muted-foreground text-gray-400 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-[#fe2858]">
                        {product.currency === "JPY"
                          ? `¥${product.price}`
                          : `$${product.price}`}
                      </span>
                      {product.mode === "subscription" && (
                        <span className="text-sm text-gray-400 ml-2">
                          /{product.interval}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">
                      {product.currency}
                    </span>
                  </div>
                  <button
                    className="w-full px-6 py-3 rounded-lg bg-[#fe2858] text-white font-semibold text-lg shadow hover:bg-[#e01e4d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fe2858] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-60"
                    onClick={() =>
                      handleBuy(product.priceId, product.name, product.mode)
                    }
                    disabled={loading || !product.priceId}
                  >
                    {loading ? "Redirecting..." : `Buy ${product.name}`}
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Environment Variables Info (for debugging) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-gray-800/20 border border-gray-600/50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">
                Debug Info:
              </h3>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Products loaded: {products.length}</p>
                <p>Regular Product ID: {REGULAR_PRODUCT_ID || "Not set"}</p>
                <p>Test Product ID: {TEST_PRODUCT_ID || "Not set"}</p>
                <p>
                  Stripe configured:{" "}
                  {process.env.STRIPE_SECRET_KEY ? "Yes" : "No"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TestboardLayout>
  );
}
