"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import callApi from "@/config/axios/axios";
import { connectGoogleAds } from "./action/connect/connectGoogleAds";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import { connectMCC } from "./action/connect/connectMCC";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleAdsConnected, setIsGoogleAdsConnected] = useState(false);
  const [isMCCConnected, setIsMCCConnected] = useState(false);
  const router = useRouter();

  const getGoogleAdsStatus = async () => {
    try {
      const { data } = await callApi.get("/auth/google-ads/status");
      setIsGoogleAdsConnected(data.connected);
    } catch (error) {
      console.log(error);
    }
  };

  const getMCCStatus = async () => {
    try {
      const { data } = await callApi.get("/auth/google-ads/mcc/status");
      console.log("MCC credentials", data);
      setIsMCCConnected(data.status === "ACTIVE");
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnectGoogleAds = async () => {
    try {
      setIsLoading(true);
      // const { data } = await callApi.get("/auth/google-ads/sign-in");

      // console.log(data);

      // if (data.connected) {
      //   setIsGoogleAdsConnected(true);
      // } else if (data.url) {
      //   router.push(data.url);
      // }
      connectGoogleAds("/dashboard/settings", (url) => {
        router.push(url);
      });
    } catch (error: any) {
      console.log(error.response.data.url);
      if (error.response.data.url) {
        router.push(error.response.data.url);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectMCC = async () => {
    try {
      connectMCC("/dashboard/settings", (url) => {
        router.push(url);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGoogleAdsStatus();
    getMCCStatus();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">設定</h1>
        <p className="text-[13px] text-muted-foreground">
          アカウント設定を管理できます
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">プロフィール</CardTitle>
            <CardDescription className="text-[12px]">
              アカウント情報を更新できます
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[13px]">
                名前
              </Label>
              <Input
                id="name"
                placeholder="名前を入力"
                className="h-9 text-[13px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[13px]">
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="メールアドレスを入力"
                className="h-9 text-[13px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[13px]">
                会社名
              </Label>
              <Input
                id="company"
                placeholder="会社名を入力"
                className="h-9 text-[13px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">セキュリティ</CardTitle>
            <CardDescription className="text-[12px]">
              パスワードを変更できます
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-[13px]">
                現在のパスワード
              </Label>
              <Input
                id="current-password"
                type="password"
                className="h-9 text-[13px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-[13px]">
                新しいパスワード
              </Label>
              <Input
                id="new-password"
                type="password"
                className="h-9 text-[13px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[13px]">
                パスワード確認
              </Label>
              <Input
                id="confirm-password"
                type="password"
                className="h-9 text-[13px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">アカウント統合</CardTitle>
            <CardDescription className="text-[12px]">
              より多くの機能にアクセスするにはアカウントを接続してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 ">
              <p className="text-[13px]">Google Ads</p>
              <div className="  flex items-center gap-4  ">
                <div className="text-xs text-slate-500 flex flex-col gap-1">
                  <p>Ads Account</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`text-[13px] w-fit ${isGoogleAdsConnected ? "bg-green-100 border-green-200 text-green-500" : ""} `}
                    disabled={isGoogleAdsConnected}
                    onClick={handleConnectGoogleAds}
                  >
                    {isGoogleAdsConnected ? "Connected" : "Connect"}
                  </Button>
                </div>
                <div className="text-xs text-slate-500 flex flex-col gap-1">
                  <p>MCC Linking</p>
                  <div className="flex flex-row gap-2 items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`text-[13px] w-fit ${isMCCConnected ? "bg-green-100 border-green-200 text-green-500" : ""} `}
                      disabled={isMCCConnected}
                      onClick={handleConnectMCC}
                    >
                      {isMCCConnected ? "Connected" : "Connect"}
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="p-0.5"
                      onClick={() => {
                        getMCCStatus();
                      }}
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-2">
              <p className="text-[13px]">Google Ads MCC</p>
              <Button
                variant="outline"
                size="sm"
                className={`text-[13px] w-fit ${isMCCConnected ? "bg-green-100 border-green-200 text-green-500" : ""} `}
                disabled={isMCCConnected}
              >
                {isMCCConnected ? "Connected" : "Connect"}
              </Button>
            </div> */}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="text-[13px]"
        >
          {isLoading ? "保存中..." : "変更を保存"}
        </Button>
      </div>
    </div>
  );
}
