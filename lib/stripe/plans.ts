export interface PlanConfig {
  key: string;
  nameJa: string;
  nameEn: string;
  priceMonthly: number; // JPY — no decimal (Stripe JPY = smallest unit)
  videoLimit: number;
  featuresJa: string[];
  priceId: string;
  overagePrice: number | null; // price per 10 extra videos, null if not applicable
  mode: "subscription";
}

export interface AddonConfig {
  key: string;
  nameJa: string;
  nameEn: string;
  price: number; // JPY
  videoCount: number;
  priceId: string;
  mode: "payment";
}

export const PLANS: PlanConfig[] = [
  {
    key: "company_tool",
    nameJa: "企業向けツールプラン",
    nameEn: "Company Tool",
    priceMonthly: 50000,
    videoLimit: 100,
    featuresJa: [
      "動画生成 月100本まで",
      "全テンプレート利用可能",
      "追加動画 10本 ¥5,000",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_COMPANY_TOOL_PRICE_ID || "",
    overagePrice: 5000,
    mode: "subscription",
  },
  {
    key: "company_support",
    nameJa: "企業向けサポートプラン",
    nameEn: "Company Support",
    priceMonthly: 50000,
    videoLimit: 0,
    featuresJa: [
      "レポート作成支援",
      "月次ミーティング",
      "専任サポート担当",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_COMPANY_SUPPORT_PRICE_ID || "",
    overagePrice: null,
    mode: "subscription",
  },
  {
    key: "vendor_tool",
    nameJa: "ベンダー向けツールプラン",
    nameEn: "Vendor Tool",
    priceMonthly: 100000,
    videoLimit: 200,
    featuresJa: [
      "動画生成 月200本まで",
      "全テンプレート利用可能",
      "優先サポート",
      "追加動画 10本 ¥5,000",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_VENDOR_TOOL_PRICE_ID || "",
    overagePrice: 5000,
    mode: "subscription",
  },
];

export const VIDEO_ADDON: AddonConfig = {
  key: "video_addon",
  nameJa: "追加動画パック",
  nameEn: "Video Addon",
  price: 5000,
  videoCount: 10,
  priceId: process.env.NEXT_PUBLIC_STRIPE_VIDEO_ADDON_PRICE_ID || "",
  mode: "payment",
};

/** Find a plan by its key */
export function getPlanByKey(key: string): PlanConfig | undefined {
  return PLANS.find((p) => p.key === key);
}

/** Find a plan by its Stripe price ID */
export function getPlanByPriceId(priceId: string): PlanConfig | undefined {
  return PLANS.find((p) => p.priceId && p.priceId === priceId);
}
