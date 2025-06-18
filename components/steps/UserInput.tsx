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

interface UserInputProps {
  data: any;
  updateData: (data: any) => void;
  errors?: Record<string, string>;
}

export function UserInput({ data, updateData, errors = {} }: UserInputProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    updateData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currencyOptions = [
    { value: "JPY", label: "JPY (¥)" },
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "KRW", label: "KRW (₩)" },
    { value: "CNY", label: "CNY (¥)" },
  ];

  return (
    <motion.div className="space-y-10 w-full px-2 sm:px-0">
      {/* Searchword Section */}
      <div>
        <h2 className="font-bold text-2xl mb-4">検索ワード</h2>
        <div className="mb-4">
          <Label htmlFor="searchword">動画検索ワード</Label>
          <Input
            id="searchword"
            name="searchword"
            value={data.searchword || ""}
            onChange={handleChange}
            placeholder="例：日焼け止め、化粧水など"
          />
        </div>
      </div>
      {/* Product Info */}
      <div>
        <h2 className="font-bold text-2xl mb-4">プロダクト情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="product_name">商品名</Label>
            <Input
              id="product_name"
              name="product_name"
              value={data.product_name || ""}
              onChange={handleChange}
              placeholder="商品名"
            />
          </div>
          <div>
            <Label htmlFor="product_category">商品カテゴリー</Label>
            <Select
              value={data.product_category || ""}
              onValueChange={(v) => handleSelectChange("product_category", v)}
            >
              <SelectTrigger
                id="product_category"
                name="product_category"
                className="w-full"
              >
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="化粧品">化粧品</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="functional_value">
            この商品が提供する主な機能的価値（特徴や強み）について教えてください。
          </Label>
          <Input
            id="functional_value"
            name="functional_value"
            value={data.functional_value || ""}
            onChange={handleChange}
            placeholder="例：高保湿力、ビタミンC誘導体配合、ベタつかない、独自の〇〇技術を採用"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="emotional_value">
            この商品が提供する感情的な満足や心理的価値には、どのようなものがありますか？
          </Label>
          <Input
            id="emotional_value"
            name="emotional_value"
            value={data.emotional_value || ""}
            onChange={handleChange}
            placeholder="例：肌に優しい成分だから、安心して使える。肌の調子が整うことで見た目に自信がもてる"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="cost">商品の価格</Label>
            <div className="flex gap-2">
              <Select
                value={data.currency || "JPY"}
                onValueChange={(v) => handleSelectChange("currency", v)}
              >
                <SelectTrigger id="currency" name="currency" className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      className="min-w-[50px]"
                      value={opt.value}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="cost"
                name="cost"
                type="number"
                min="0"
                value={data.cost || ""}
                onChange={handleChange}
                placeholder="額"
                className="w-full"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="marketing_campaign">キャンペーン等の記載</Label>
            <Input
              id="marketing_campaign"
              name="marketing_campaign"
              value={data.marketing_campaign || ""}
              onChange={handleChange}
              placeholder="例：初回限定！50%オフ、送料無料"
            />
          </div>
        </div>
      </div>
      {/* Target Info */}
      <div>
        <h2 className="font-bold text-2xl mb-4 mt-8">ターゲット情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="age">年齢</Label>
            <Select
              value={data.age || ""}
              onValueChange={(v) => handleSelectChange("age", v)}
            >
              <SelectTrigger id="age" name="age" className="w-full">
                <SelectValue placeholder="年齢を選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20代">20代</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="gender">性別</Label>
            <Select
              value={data.gender || ""}
              onValueChange={(v) => handleSelectChange("gender", v)}
            >
              <SelectTrigger id="gender" name="gender" className="w-full">
                <SelectValue placeholder="性別を選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="女性">女性</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="issue">ペイン・課題</Label>
          <Input
            id="issue"
            name="issue"
            value={data.issue || ""}
            onChange={handleChange}
            placeholder="例：忙しくてスキンケアに時間をかけられない。肌荒れや乾燥がなかなか改善できていない。"
          />
        </div>
      </div>
    </motion.div>
  );
}

export const userInputSchema = z.object({
  product_name: z.string().min(1, "商品名は必須です"),
  product_category: z.string().min(1, "商品カテゴリーは必須です"),
  functional_value: z.string().min(1, "機能的価値は必須です"),
  emotional_value: z.string().min(1, "感情的価値は必須です"),
  currency: z.string().min(1, "通貨は必須です"),
  cost: z.union([
    z
      .string()
      .min(1, "価格は必須です")
      .refine((val) => !isNaN(Number(val)), "価格は数値で入力してください"),
    z.number().min(0, "価格は必須です"),
  ]),
  marketing_campaign: z.string().min(1, "キャンペーン等の記載は必須です"),
  age: z.string().min(1, "年齢は必須です"),
  gender: z.string().min(1, "性別は必須です"),
  issue: z.string().min(1, "ペイン・課題は必須です"),
});
