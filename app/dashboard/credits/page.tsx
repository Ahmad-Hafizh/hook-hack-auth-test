"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  CreditCard,
  Shield,
  Sparkles,
  Loader2,
  Plus,
  Settings,
} from "lucide-react";
import {
  SubscriptionState,
  SubscriptionDetail,
  EMPTY_SUBSCRIPTION,
} from "@/lib/stripe/subscription";
import { PLANS, VIDEO_ADDON, PlanConfig, AddonConfig } from "@/lib/stripe/plans";

// ─── Checkout helper ───────────────────────────────────────────

async function startCheckout(
  priceId: string,
  mode: "subscription" | "payment",
  planKey: string
) {
  const res = await fetch("/api/stripe", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId, mode, planKey }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Checkout failed");
  }

  const { url } = await res.json();
  if (url) {
    window.location.href = url;
  }
}

async function openPortal() {
  const res = await fetch("/api/stripe/portal", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Portal failed");
  }

  const { url } = await res.json();
  if (url) {
    window.location.href = url;
  }
}

// ─── Plan pricing card data ────────────────────────────────────

interface PricingCardData {
  planKey: string;
  title: string;
  price: string;
  priceNote: string;
  features: string[];
  priceId: string;
  mode: "subscription" | "payment";
}

function buildPricingCards(): { company: PricingCardData[]; vendor: PricingCardData[] } {
  const findPlan = (key: string) => PLANS.find((p) => p.key === key);

  const companyTool = findPlan("company_tool");
  const companySupport = findPlan("company_support");
  const vendorTool = findPlan("vendor_tool");

  const company: PricingCardData[] = [];
  if (companyTool) {
    company.push({
      planKey: companyTool.key,
      title: "ツール",
      price: `¥${companyTool.priceMonthly.toLocaleString()}`,
      priceNote: "月額・税別",
      features: companyTool.featuresJa,
      priceId: companyTool.priceId,
      mode: "subscription",
    });
  }
  if (companySupport) {
    company.push({
      planKey: companySupport.key,
      title: "サポート",
      price: `¥${companySupport.priceMonthly.toLocaleString()}`,
      priceNote: "月額・税別",
      features: companySupport.featuresJa,
      priceId: companySupport.priceId,
      mode: "subscription",
    });
  }

  const vendor: PricingCardData[] = [];
  if (vendorTool) {
    vendor.push({
      planKey: vendorTool.key,
      title: "ツール",
      price: `¥${vendorTool.priceMonthly.toLocaleString()}`,
      priceNote: "月額・税別",
      features: vendorTool.featuresJa,
      priceId: vendorTool.priceId,
      mode: "subscription",
    });
  }

  return { company, vendor };
}

// ─── Components ────────────────────────────────────────────────

function PricingCardComponent({
  plan,
  isCurrentPlan,
  activePlanKeys,
}: {
  plan: PricingCardData;
  isCurrentPlan: boolean;
  activePlanKeys: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasPriceId = !!plan.priceId;
  const alreadySubscribed = activePlanKeys.includes(plan.planKey);

  const handleBuy = async () => {
    if (!hasPriceId || alreadySubscribed) return;
    setLoading(true);
    setError(null);
    try {
      await startCheckout(plan.priceId, plan.mode, plan.planKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <Card className={`flex flex-col ${isCurrentPlan ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[15px]">{plan.title}</CardTitle>
        {isCurrentPlan && (
          <Badge className="text-[10px] font-normal">現在のプラン</Badge>
        )}
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="mb-6">
          <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
          <span className="text-[12px] text-muted-foreground ml-1.5">
            / {plan.priceNote}
          </span>
        </div>
        <ul className="space-y-2.5 mb-8 flex-1">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="size-4 text-primary shrink-0 mt-0.5 stroke-[1.5]" />
              <span className="text-[13px] text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {error && (
          <p className="text-[12px] text-destructive mb-2">{error}</p>
        )}

        {alreadySubscribed ? (
          <Button variant="outline" className="w-full text-[13px]" disabled>
            <Check className="size-4 mr-2 stroke-[1.5]" />
            加入済み
          </Button>
        ) : hasPriceId ? (
          <Button
            className="w-full text-[13px]"
            onClick={handleBuy}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 mr-2 animate-spin stroke-[1.5]" />
            ) : (
              <CreditCard className="size-4 mr-2 stroke-[1.5]" />
            )}
            {loading ? "処理中..." : "このプランに申し込む"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full text-[13px]" disabled>
            準備中
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function AddonCard({ addon }: { addon: AddonConfig }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasPriceId = !!addon.priceId;

  const handleBuy = async () => {
    if (!hasPriceId) return;
    setLoading(true);
    setError(null);
    try {
      await startCheckout(addon.priceId, "payment", addon.key);
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[15px]">{addon.nameJa}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold tracking-tight">
            ¥{addon.price.toLocaleString()}
          </span>
          <span className="text-[12px] text-muted-foreground">
            / {addon.videoCount}本
          </span>
        </div>
        <p className="text-[13px] text-muted-foreground mb-4">
          クレジットが足りない場合に追加で購入できます。現在のクレジットに加算されます。
        </p>

        {error && (
          <p className="text-[12px] text-destructive mb-2">{error}</p>
        )}

        {hasPriceId ? (
          <Button
            variant="outline"
            className="w-full text-[13px]"
            onClick={handleBuy}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 mr-2 animate-spin stroke-[1.5]" />
            ) : (
              <Plus className="size-4 mr-2 stroke-[1.5]" />
            )}
            {loading ? "処理中..." : "クレジットを追加購入"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full text-[13px]" disabled>
            準備中
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "active"
      ? "default"
      : status === "past_due"
        ? "destructive"
        : "secondary";
  const label =
    status === "active"
      ? "有効"
      : status === "past_due"
        ? "支払い遅延"
        : status === "trialing"
          ? "トライアル"
          : status === "canceled"
            ? "解約済み"
            : status;
  return (
    <Badge variant={variant} className="text-[11px] font-normal">
      {label}
    </Badge>
  );
}

function ToolPlanCard({
  sub,
  subscription,
  onManage,
}: {
  sub: SubscriptionDetail;
  subscription: SubscriptionState;
  onManage: () => void;
}) {
  const creditsRemaining = subscription.videosLimit - subscription.videosUsed;
  const usagePercent =
    subscription.videosLimit > 0
      ? Math.round((subscription.videosUsed / subscription.videosLimit) * 100)
      : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-muted-foreground stroke-[1.5]" />
          <CardTitle className="text-[15px]">
            {sub.planNameJa || "ツールプラン"}
          </CardTitle>
        </div>
        <StatusBadge status={sub.status} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-[13px] mb-2">
            <span className="text-muted-foreground">クレジット使用状況</span>
            <span className="tabular-nums font-medium">
              {creditsRemaining} / {subscription.videosLimit} 残り
            </span>
          </div>
          <Progress value={usagePercent} />
          <p className="text-[11px] text-muted-foreground mt-1.5">
            {subscription.videosUsed}本使用済み・{creditsRemaining}本残り
          </p>
        </div>
        {sub.periodEnd && (
          <p className="text-[12px] text-muted-foreground">
            次回更新日: {new Date(sub.periodEnd).toLocaleDateString("ja-JP")}
          </p>
        )}
        <Button
          variant="outline"
          size="sm"
          className="text-[12px]"
          onClick={onManage}
        >
          <Settings className="size-3.5 mr-1.5 stroke-[1.5]" />
          プラン管理
        </Button>
      </CardContent>
    </Card>
  );
}

function SupportPlanCard({
  sub,
  onManage,
}: {
  sub: SubscriptionDetail;
  onManage: () => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground stroke-[1.5]" />
          <CardTitle className="text-[15px]">
            {sub.planNameJa || "サポートプラン"}
          </CardTitle>
        </div>
        <StatusBadge status={sub.status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-[13px] text-muted-foreground">
          レポート・コンサルティングサービス
        </p>
        {sub.periodEnd && (
          <p className="text-[12px] text-muted-foreground">
            次回更新日: {new Date(sub.periodEnd).toLocaleDateString("ja-JP")}
          </p>
        )}
        <Button
          variant="outline"
          size="sm"
          className="text-[12px]"
          onClick={onManage}
        >
          <Settings className="size-3.5 mr-1.5 stroke-[1.5]" />
          プラン管理
        </Button>
      </CardContent>
    </Card>
  );
}

function FreePlanCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-muted-foreground stroke-[1.5]" />
          <CardTitle className="text-[15px]">フリープラン</CardTitle>
        </div>
        <Badge variant="secondary" className="text-[11px] font-normal">
          無料
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-[13px] text-muted-foreground">
          下のプランに加入して動画生成を始めましょう
        </p>
      </CardContent>
    </Card>
  );
}

function SubscriptionSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="h-5 w-32 rounded bg-muted animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-3 w-48 rounded bg-muted animate-pulse" />
          <div className="h-2 w-full rounded bg-muted animate-pulse" />
          <div className="h-3 w-24 rounded bg-muted animate-pulse" />
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────

export default function CreditsPage() {
  const [subscription, setSubscription] =
    useState<SubscriptionState>(EMPTY_SUBSCRIPTION);
  const [isLoading, setIsLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await fetch("/api/stripe/subscription", { credentials: "include" });
        if (res.ok) {
          const data: SubscriptionState = await res.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscription();
  }, []);

  const toolSub = subscription.subscriptions?.find((s) => !s.isSupportPlan);
  const supportSub = subscription.subscriptions?.find((s) => s.isSupportPlan);
  const hasAnyPlan =
    subscription.status !== "none" &&
    (subscription.subscriptions?.length ?? 0) > 0;

  // Collect active plan keys to mark "already subscribed"
  const activePlanKeys =
    subscription.subscriptions
      ?.filter((s) => s.status === "active")
      .map((s) => s.planKey)
      .filter((k): k is string => !!k) ?? [];

  const { company, vendor } = buildPricingCards();

  const handleManage = async () => {
    setPortalLoading(true);
    try {
      await openPortal();
    } catch (e) {
      console.error("Portal error:", e);
      setPortalLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">
          料金・クレジット
        </h1>
        <p className="text-[13px] text-muted-foreground">
          サブスクリプション状況と料金プラン
        </p>
      </div>

      {/* ── Current Subscription Status ── */}
      <div>
        <h2 className="text-[15px] font-medium mb-3">現在のプラン</h2>
        {isLoading ? (
          <SubscriptionSkeleton />
        ) : hasAnyPlan ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolSub && (
              <ToolPlanCard
                sub={toolSub}
                subscription={subscription}
                onManage={handleManage}
              />
            )}
            {supportSub && (
              <SupportPlanCard sub={supportSub} onManage={handleManage} />
            )}
          </div>
        ) : (
          <div className="max-w-md">
            <FreePlanCard />
          </div>
        )}
      </div>

      {/* ── Addon Purchase ── */}
      {hasAnyPlan && toolSub && (
        <div>
          <h2 className="text-[15px] font-medium mb-3">クレジット追加</h2>
          <div className="max-w-md">
            <AddonCard addon={VIDEO_ADDON} />
          </div>
        </div>
      )}

      {/* ── Pricing Plans ── */}
      <div>
        <h2 className="text-[15px] font-medium mb-3">料金プラン</h2>
        <Tabs defaultValue="company" className="w-full">
          <TabsList>
            <TabsTrigger value="company" className="text-[13px]">
              事業会社様向け
            </TabsTrigger>
            <TabsTrigger value="vendor" className="text-[13px]">
              広告代理店様向け
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {company.map((plan) => (
                <PricingCardComponent
                  key={plan.planKey}
                  plan={plan}
                  isCurrentPlan={activePlanKeys.includes(plan.planKey)}
                  activePlanKeys={activePlanKeys}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendor" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {vendor.map((plan) => (
                <PricingCardComponent
                  key={plan.planKey}
                  plan={plan}
                  isCurrentPlan={activePlanKeys.includes(plan.planKey)}
                  activePlanKeys={activePlanKeys}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
