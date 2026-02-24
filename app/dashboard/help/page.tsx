"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, ExternalLink, Search } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "HookHackとは何ですか？",
    answer: "HookHackは、AI技術を活用して効果的な広告動画を自動生成するサービスです。商品情報を入力するだけで、PDCAサイクルに基づいた複数パターンの動画を作成できます。",
  },
  {
    question: "動画の生成にはどれくらいの時間がかかりますか？",
    answer: "動画の生成には通常1〜3分程度かかります。生成中は進行状況が表示されますので、完了までお待ちください。",
  },
  {
    question: "クレジットとは何ですか？",
    answer: "クレジットは動画を生成するために必要なポイントです。1クレジットで1本の動画を生成できます。クレジットは購入ページから追加購入できます。",
  },
  {
    question: "生成した動画はどこで確認できますか？",
    answer: "生成した動画は「動画一覧」ページで確認できます。ダウンロードや再生も同ページから行えます。",
  },
  {
    question: "プロジェクトを途中で保存できますか？",
    answer: "はい、プロジェクトは自動的に保存されます。「プロジェクト」ページから途中のプロジェクトを再開できます。",
  },
  {
    question: "対応している動画フォーマットは何ですか？",
    answer: "現在、横型（16:9）と縦型（9:16）の2つのフォーマットに対応しています。また、15秒と30秒の動画長を選択できます。",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">ヘルプ</h1>
          <p className="text-[13px] text-muted-foreground">よくある質問やサポート情報</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground stroke-[1.5]" />
          <Input
            placeholder="質問を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-[13px]"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">よくある質問</CardTitle>
              <CardDescription className="text-[12px]">一般的な質問と回答</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-[13px]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[13px] text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFaqs.length === 0 && (
                <p className="text-center text-[13px] text-muted-foreground py-8">
                  該当する質問が見つかりませんでした
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">ドキュメント</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] text-muted-foreground mb-4">
                詳細なガイドとチュートリアルをご覧ください
              </p>
              <Button variant="outline" className="w-full text-[13px]">
                <ExternalLink className="size-4 mr-2 stroke-[1.5]" />
                ドキュメントを見る
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">サポートに連絡</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] text-muted-foreground mb-4">
                お困りの際はサポートチームまでご連絡ください
              </p>
              <Button className="w-full text-[13px]">
                <Mail className="size-4 mr-2 stroke-[1.5]" />
                お問い合わせ
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-[15px]">クイックヒント</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-[13px] text-muted-foreground">
                <li>・商品の特徴を具体的に入力すると、より効果的な動画が生成されます</li>
                <li>・複数パターンを生成して、A/Bテストを行いましょう</li>
                <li>・縦型動画はSNS広告に最適です</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
