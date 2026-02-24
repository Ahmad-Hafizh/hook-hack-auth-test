export interface SubscriptionDetail {
  subscriptionId: string;
  planKey: string | null;
  planNameJa: string | null;
  status: string;
  isSupportPlan: boolean;
  videosLimit: number;
  periodStart: string | null;
  periodEnd: string | null;
}

export interface SubscriptionState {
  planKey: string | null;
  planNameJa: string | null;
  status: "active" | "canceled" | "past_due" | "trialing" | "none";
  videosUsed: number;
  videosLimit: number;
  periodStart: string | null; // ISO date
  periodEnd: string | null; // ISO date
  stripeCustomerId: string | null;
  subscriptionId: string | null;
  subscriptions?: SubscriptionDetail[];
}

/** Default empty subscription state */
export const EMPTY_SUBSCRIPTION: SubscriptionState = {
  planKey: null,
  planNameJa: null,
  status: "none",
  videosUsed: 0,
  videosLimit: 0,
  periodStart: null,
  periodEnd: null,
  stripeCustomerId: null,
  subscriptionId: null,
  subscriptions: [],
};
