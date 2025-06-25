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

const TrialSchema = z.object({
  company: z.string().min(1, "会社名は必須です"),
  name: z.string().min(1, "お名前は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  tiktok: z.string().url("正しいURLを入力してください"),
});
type TrialForm = z.infer<typeof TrialSchema>;

type TrialDialogProps = {
  trigger: ReactNode;
};

export default function TrialDialog({ trigger }: TrialDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<TrialForm>({
    resolver: zodResolver(TrialSchema),
    defaultValues: { company: "", name: "", email: "", tiktok: "" },
  });

  async function onSubmit(values: TrialForm) {
    console.log(values);
    setOpen(false);
    form.reset();
    // Optionally show a toast or success message
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
      <DialogContent className="max-w-xl">
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
                  <FormLabel>TikTokアカウント</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="TikTokアカウントURL"
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
              >
                申し込む
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
