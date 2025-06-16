"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

const targetSchema = z.object({
  targetAge: z
    .string()
    .min(1, "Target Age is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Target Age must be a number",
    }),
  targetGender: z.string().min(1, "Target Gender is required"),
  targetInsight: z.string().min(1, "Target Insight is required"),
  other: z.string().optional(),
});

interface TargetInfo {
  age: string;
  gender: string;
  why: string;
  issue: string;
}

interface MarketingInfo {
  currency: string;
  amount: string;
  duration: string;
  cost: string;
  campaing: string;
  apeals: string;
}

interface UserInputTargetProps {
  data: {
    target_info: TargetInfo;
    marketing_info: MarketingInfo;
  };
  updateData: (data: any) => void;
  errors?: Record<string, string>;
}

const currencyOptions = [
  { value: "JPY", label: "¥" },
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
  { value: "KRW", label: "₩" },
  { value: "CNY", label: "¥ (CNY)" },
];

const durationOptions = [
  { value: "week", label: "week" },
  { value: "month", label: "month" },
  { value: "3 month", label: "3 month" },
  { value: "6 month", label: "6 month" },
  { value: "year", label: "year" },
];

export function UserInputTarget({ data, updateData, errors = {} }: UserInputTargetProps) {
  // Helper to get symbol from currency code
  const getCurrencySymbol = (code: string) => {
    const found = currencyOptions.find((c) => c.value === code);
    return found ? found.label.replace(/ \(.*\)/, "") : code;
  };

  // When any cost part changes, update cost string
  const updateCost = (currency: string, amount: string, duration: string) => {
    const symbol = getCurrencySymbol(currency);
    const cost = amount ? `${symbol}${amount}${duration ? "/" + duration : ""}` : "";
    updateData({
      ...data,
      marketing_info: {
        ...data.marketing_info,
        currency,
        amount,
        duration,
        cost,
      },
    });
  };

  const handleTargetChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      target_info: {
        ...data.target_info,
        [name]: value,
      },
    });
  };

  const handleMarketingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (["amount"].includes(name)) {
      updateCost(
        data.marketing_info.currency || "JPY",
        value,
        data.marketing_info.duration || "month"
      );
    } else {
      updateData({
        ...data,
        marketing_info: {
          ...data.marketing_info,
          [name]: value,
        },
      });
    }
  };

  const handleCurrencyChange = (value: string) => {
    updateCost(
      value,
      data.marketing_info.amount || "",
      data.marketing_info.duration || "month"
    );
  };

  const handleDurationChange = (value: string) => {
    updateCost(
      data.marketing_info.currency || "JPY",
      data.marketing_info.amount || "",
      value
    );
  };

  const handleGenderChange = (value: string) => {
    updateData({
      ...data,
      target_info: {
        ...data.target_info,
        gender: value,
      },
    });
  };

  // Add a dedicated handler for Select dropdowns
  const handleAgeChange = (value: string) => {
    updateData({
      ...data,
      target_info: {
        ...data.target_info,
        age: value,
      },
    });
  };

  return (
    <motion.div className="space-y-8">
      {/* Who are you targeting? */}
      <div>
        <h3 className="font-bold text-lg mb-2">Who are you targeting?</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Select
              value={data.target_info.age || ""}
              onValueChange={handleAgeChange}
            >
              <SelectTrigger id="age" name="age" className="w-full">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10代">10代（10s）</SelectItem>
                <SelectItem value="20代">20代（20s）</SelectItem>
                <SelectItem value="30代">30代（30s）</SelectItem>
                <SelectItem value="40代以上">40代以上（40s~）</SelectItem>
              </SelectContent>
            </Select>
            {errors.age && <span className="text-red-500 text-xs">{errors.age}</span>}
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={data.target_info.gender || ""} onValueChange={handleGenderChange}>
              <SelectTrigger id="gender" name="gender" className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="男性">男性（men）</SelectItem>
                <SelectItem value="女性">女性（female）</SelectItem>
                <SelectItem value="男女両方">男女両方（both）</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <span className="text-red-500 text-xs">{errors.gender}</span>}
          </div>
          <div>
            <Label htmlFor="why">Why are you targeting this group?</Label>
            <Textarea
              id="why"
              name="why"
              value={data.target_info.why || ""}
              onChange={handleTargetChange}
              placeholder="Describe the reason for targeting this group"
              rows={2}
            />
            {errors.why && <span className="text-red-500 text-xs">{errors.why}</span>}
          </div>
          <div>
            <Label htmlFor="issue">What is their main issue?</Label>
            <Textarea
              id="issue"
              name="issue"
              value={data.target_info.issue || ""}
              onChange={handleTargetChange}
              placeholder="Describe the main issue of your target"
              rows={2}
            />
            {errors.issue && <span className="text-red-500 text-xs">{errors.issue}</span>}
          </div>
        </div>
      </div>
      {/* How are we going to market it? */}
      <div>
        <h3 className="font-bold text-lg mb-2">How are we going to market it?</h3>
        <div className="space-y-4">
          <div>
            <Label>Cost</Label>
            <div className="flex gap-2 items-center">
              {/* Currency Dropdown */}
              <Select
                value={data.marketing_info.currency || "JPY"}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Amount Input */}
              <Input
                id="amount"
                name="amount"
                type="number"
                min="0"
                value={data.marketing_info.amount || ""}
                onChange={handleMarketingChange}
                placeholder="Amount"
                className="w-28"
              />
              {/* Duration Dropdown */}
              <h1 className="px-5 font-bold text-lg"></h1>
              <Select
                value={data.marketing_info.duration || "month"}
                onValueChange={handleDurationChange}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.cost && <span className="text-red-500 text-xs">{errors.cost}</span>}
          </div>
          <div>
            <Label htmlFor="campaing">Campaign</Label>
            <Input
              id="campaing"
              name="campaing"
              value={data.marketing_info.campaing || ""}
              onChange={handleMarketingChange}
              placeholder="e.g. 50% off first subscription"
            />
            {errors.campaing && <span className="text-red-500 text-xs">{errors.campaing}</span>}
          </div>
          <div>
            <Label htmlFor="apeals">Key marketing appeals</Label>
            <Textarea
              id="apeals"
              name="apeals"
              value={data.marketing_info.apeals || ""}
              onChange={handleMarketingChange}
              placeholder="e.g. Pore and dullness care"
              rows={2}
            />
            {errors.apeals && <span className="text-red-500 text-xs">{errors.apeals}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
