"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const TrialSchema = z.object({
  company: z.string().min(1, "会社名は必須です"),
  name: z.string().min(1, "お名前は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  tiktok: z.string().min(1, "TikTokのユーザー名は必須です"),
});
type TrialForm = z.infer<typeof TrialSchema>;

type TrialDialogProps = {
  trigger: ReactNode;
};

export default function TrialDialog({ trigger }: TrialDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<TrialForm>({
    resolver: zodResolver(TrialSchema),
    defaultValues: { company: "", name: "", email: "", tiktok: "" },
  });

  async function onSubmit(values: TrialForm) {
    setLoading(true);
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: values.company,
          name: values.name,
          email: values.email,
          tiktok_url: values.tiktok,
        }),
      });
      if (res.ok) {
        toast({
          title: "お申し込みが完了しました",
          description:
            "ご登録ありがとうございます！担当者よりご連絡いたします。",
        });
        setOpen(false);
        form.reset();
      } else {
        const data = await res.json();
        toast({
          title: "送信エラー",
          description:
            data?.error?.formErrors?.join("\n") ||
            data?.error ||
            "送信に失敗しました。再度お試しください。",
        });
      }
    } catch (e) {
      toast({
        title: "サーバーエラー",
        description: "送信中にエラーが発生しました。再度お試しください。",
      });
    } finally {
      setLoading(false);
    }
  }

  // Reset form when dialog is opened
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl p-10">
        <DialogTitle asChild>
          <h2 className="text-2xl font-bold text-center mb-6">
            無料トライアルはこちら
          </h2>
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>会社名</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="会社名"
                      className="bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>お名前</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="お名前"
                      className="bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="メールアドレス"
                      className="bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTokのユーザー名</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="TikTokのユーザー名"
                      className="bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                className="bg-[#fe2858] text-white px-10 py-4 text-lg font-bold rounded-md shadow-lg hover:bg-[#ff5e81] z-10"
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 inline text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                申し込む
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
