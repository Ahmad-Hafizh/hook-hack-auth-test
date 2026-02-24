"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AlertTriangle, ArrowLeft, RefreshCw, MailOpen } from "lucide-react";
import Link from "next/link";

const ERROR_MESSAGES: Record<
  string,
  { title: string; description: string; suggestion: string }
> = {
  bad_oauth_state: {
    title: "認証セッションが無効です",
    description:
      "OAuth認証のセッションが見つからないか、有効期限が切れました。",
    suggestion:
      "もう一度ログインをお試しください。ブラウザのCookieが有効になっていることをご確認ください。",
  },
  invalid_request: {
    title: "無効なリクエスト",
    description: "認証リクエストが正しく処理できませんでした。",
    suggestion:
      "再度ログインをお試しください。問題が続く場合はサポートまでお問い合わせください。",
  },
  access_denied: {
    title: "アクセスが拒否されました",
    description: "認証プロバイダーへのアクセスが拒否されました。",
    suggestion: "必要な権限を許可してから、再度お試しください。",
  },
  server_error: {
    title: "サーバーエラー",
    description: "認証サーバーで内部エラーが発生しました。",
    suggestion: "しばらく時間をおいてから再度お試しください。",
  },
  temporarily_unavailable: {
    title: "一時的に利用できません",
    description: "認証サービスが一時的に利用できない状態です。",
    suggestion: "数分後に再度お試しください。",
  },
};

const DEFAULT_ERROR = {
  title: "認証エラー",
  description: "認証処理中にエラーが発生しました。",
  suggestion:
    "再度ログインをお試しください。問題が続く場合はサポートまでお問い合わせください。",
};

function AuthErrorContent() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error") || "";
  const errorCode = searchParams.get("error_code") || "";
  const errorDescription =
    searchParams.get("error_description")?.replace(/\+/g, " ") || "";

  // Look up known error by error_code first, then by error
  const knownError =
    ERROR_MESSAGES[errorCode] || ERROR_MESSAGES[error] || DEFAULT_ERROR;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Red accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-400 to-red-500" />

          <div className="p-8 sm:p-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center ring-8 ring-red-50/50">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">
              {knownError.title}
            </h1>

            {/* Description */}
            <p className="text-slate-500 text-center text-sm leading-relaxed mb-6">
              {knownError.description}
            </p>

            {/* Suggestion Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 text-sm leading-relaxed">
                💡 {knownError.suggestion}
              </p>
            </div>

            {/* Error Details (collapsible) */}
            {(error || errorCode || errorDescription) && (
              <details className="mb-6 group">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 transition-colors select-none">
                  エラー詳細を表示
                </summary>
                <div className="mt-3 bg-slate-50 rounded-lg p-4 space-y-2 text-xs font-mono text-slate-500 border border-slate-100">
                  {error && (
                    <div className="flex gap-2">
                      <span className="text-slate-400 shrink-0">error:</span>
                      <span className="text-slate-600 break-all">{error}</span>
                    </div>
                  )}
                  {errorCode && (
                    <div className="flex gap-2">
                      <span className="text-slate-400 shrink-0">code:</span>
                      <span className="text-slate-600 break-all">
                        {errorCode}
                      </span>
                    </div>
                  )}
                  {errorDescription && (
                    <div className="flex gap-2">
                      <span className="text-slate-400 shrink-0">detail:</span>
                      <span className="text-slate-600 break-all">
                        {errorDescription}
                      </span>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="/sign-in"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0093b4] hover:bg-[#007a92] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                再度ログインする
              </Link>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-600 font-medium py-3 px-6 rounded-lg transition-colors text-sm border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                トップページに戻る
              </Link>
            </div>
          </div>
        </div>

        {/* Help link */}
        <div className="mt-6 text-center">
          <a
            href="mailto:support@hook-hack.com"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            <MailOpen className="w-3.5 h-3.5" />
            問題が解決しない場合はサポートにお問い合わせください
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0093b4] rounded-full animate-spin" />
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
