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
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface UserInputProps {
  data: any;
  updateData: (data: any) => void;
  onNextStep?: (values: any) => void;
  errors?: Record<string, string>;
}

export function UserInput({
  data,
  updateData,
  onNextStep,
  errors = {},
}: UserInputProps) {
  const form = useForm({
    resolver: zodResolver(userInputSchema),
    defaultValues: data,
    mode: "onBlur",
  });

  const watchedValues = useWatch({ control: form.control });

  // Sync form state with parent
  useEffect(() => {
    if (JSON.stringify(form.getValues()) !== JSON.stringify(data)) {
      form.reset(data);
    }
  }, [data]);

  const onSubmit = (values: any) => {
    updateData(values);
    if (onNextStep) onNextStep(values);
  };

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
    <Form {...form}>
      <form
        id="user-input-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 w-full px-2 sm:px-0"
      >
        {/* Searchword Section */}
        <h2 className="font-bold text-2xl mb-4">検索ワード</h2>
        <FormField
          control={form.control}
          name="searchword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>検索ワード</FormLabel>
              <FormControl>
                <Input {...field} placeholder="例：日焼け止め、化粧水など" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Product Info */}
        <h2 className="font-bold text-2xl mb-4">プロダクト情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>商品名</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="商品名" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>商品カテゴリー</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="functional_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                この商品が提供する主な機能的価値（特徴や強み）について教えてください。
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="例：高保湿力、ビタミンC誘導体配合、ベタつかない、独自の〇〇技術を採用"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emotional_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                この商品が提供する感情的な満足や心理的価値には、どのようなものがありますか？
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="例：肌に優しい成分だから、安心して使える。肌の調子が整うことで見た目に自信がもてる"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>商品の価格</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field: currencyField }) => (
                        <Select
                          value={currencyField.value || "JPY"}
                          onValueChange={currencyField.onChange}
                        >
                          <SelectTrigger
                            id="currency"
                            name="currency"
                            className="w-24"
                          >
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
                      )}
                    />
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="額"
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketing_campaign"
            render={({ field }) => (
              <FormItem>
                <FormLabel>キャンペーン等の記載</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="例：初回限定！50%オフ、送料無料"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Target Info */}
        <h2 className="font-bold text-2xl mb-4 mt-8">ターゲット情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>年齢</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="age" name="age" className="w-full">
                      <SelectValue placeholder="年齢を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20代">20代</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性別</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="gender" name="gender" className="w-full">
                      <SelectValue placeholder="性別を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="女性">女性</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="issue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ペイン・課題</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="例：忙しくてスキンケアに時間をかけられない。肌荒れや乾燥がなかなか改善できていない。"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export const userInputSchema = z.object({
  searchword: z.string().min(1, "こちらは必須項目です。"),
  product_name: z.string().min(1, "こちらは必須項目です。"),
  product_category: z.string().min(1, "こちらは必須項目です。"),
  functional_value: z.string().min(1, "こちらは必須項目です。"),
  emotional_value: z.string().min(1, "こちらは必須項目です。"),
  currency: z.string().min(1, "こちらは必須項目です。"),
  cost: z.union([
    z
      .string()
      .min(1, "価格は必須です")
      .refine((val) => !isNaN(Number(val)), "価格は数値で入力してください"),
    z.number().min(0, "価格は必須です"),
  ]),
  marketing_campaign: z.string().min(1, "こちらは必須項目です。"),
  age: z.string().min(1, "こちらは必須項目です。"),
  gender: z.string().min(1, "こちらは必須項目です。"),
  issue: z.string().min(1, "こちらは必須項目です。"),
});
