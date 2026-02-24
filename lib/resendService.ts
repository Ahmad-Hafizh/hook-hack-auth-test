import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "HookHack <noreply@hook-hack.com>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://hook-hack.com";

export async function sendOnboardingEmailWithResend(
  email: string,
  name: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to HookHack!",
      html: `
        <div style="background:#272727;padding:40px 0 32px 0;text-align:center;font-family:sans-serif;color:#fff;min-height:100vh;">
          <div style="max-width:480px;margin:0 auto;background:#1a1a1a;border-radius:16px;padding:32px 24px 24px 24px;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
            <div style="margin-bottom:32px;">
              <h1 style="color:#fe2858;font-size:2.2rem;margin:0 0 8px 0;font-weight:800;letter-spacing:-1px;">Welcome, ${escapeHtml(name)}!</h1>
              <p style="color:#fff;font-size:1.1rem;margin:0 0 16px 0;">We're excited to have you on board.</p>
            </div>
            <div style="margin-bottom:24px;">
              <p style="color:#fff;font-size:1rem;margin:0 0 8px 0;">Start exploring your dashboard now and make the most of your experience.</p>
            </div>
            <a href="${APP_URL}/dashboard" style="display:inline-block;padding:14px 36px;background:#fe2858;color:#fff;border-radius:8px;font-size:1.1rem;font-weight:700;text-decoration:none;letter-spacing:0.5px;box-shadow:0 2px 8px rgba(254,40,88,0.12);margin-top:8px;">Go to Dashboard</a>
            <div style="margin-top:32px;color:#aaa;font-size:0.95rem;">If you have any questions, just reply to this email. We're here to help!</div>
          </div>
        </div>
      `,
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

type SubscriptionEmailType = "new_subscription" | "renewal" | "cancellation" | "payment_failed";

const SUBJECT_MAP: Record<SubscriptionEmailType, string> = {
  new_subscription: "【HookHack】サブスクリプション登録完了",
  renewal: "【HookHack】サブスクリプション更新完了",
  cancellation: "【HookHack】サブスクリプション解約のお知らせ",
  payment_failed: "【HookHack】お支払いに失敗しました",
};

export async function sendSubscriptionEmail(
  email: string,
  name: string,
  type: SubscriptionEmailType,
  planName: string
) {
  const displayName = escapeHtml(name || "お客様");
  const displayPlan = escapeHtml(planName);

  const bodyMap: Record<SubscriptionEmailType, string> = {
    new_subscription: `
      <h2 style="color:#fe2858;margin:0 0 16px 0;">サブスクリプション登録完了</h2>
      <p>${displayName} 様</p>
      <p><strong>${displayPlan}</strong> へのご登録ありがとうございます。</p>
      <p>クレジットが付与されました。ダッシュボードからご確認ください。</p>
      <a href="${APP_URL}/dashboard/credits" style="display:inline-block;padding:12px 32px;background:#fe2858;color:#fff;border-radius:8px;font-size:1rem;font-weight:700;text-decoration:none;margin-top:16px;">ダッシュボードへ</a>
    `,
    renewal: `
      <h2 style="color:#fe2858;margin:0 0 16px 0;">サブスクリプション更新完了</h2>
      <p>${displayName} 様</p>
      <p><strong>${displayPlan}</strong> の月次更新が完了しました。クレジットがリセットされました。</p>
      <a href="${APP_URL}/dashboard/credits" style="display:inline-block;padding:12px 32px;background:#fe2858;color:#fff;border-radius:8px;font-size:1rem;font-weight:700;text-decoration:none;margin-top:16px;">クレジット確認</a>
    `,
    cancellation: `
      <h2 style="color:#fe2858;margin:0 0 16px 0;">サブスクリプション解約</h2>
      <p>${displayName} 様</p>
      <p><strong>${displayPlan}</strong> が解約されました。</p>
      <p>現在の請求期間が終了するまでサービスをご利用いただけます。</p>
      <p>再度ご検討いただける場合は、いつでもプランページからお申し込みください。</p>
      <a href="${APP_URL}/dashboard/credits" style="display:inline-block;padding:12px 32px;background:#fe2858;color:#fff;border-radius:8px;font-size:1rem;font-weight:700;text-decoration:none;margin-top:16px;">プランを確認</a>
    `,
    payment_failed: `
      <h2 style="color:#fe2858;margin:0 0 16px 0;">お支払いに失敗しました</h2>
      <p>${displayName} 様</p>
      <p>サブスクリプションのお支払い処理に失敗しました。</p>
      <p>お支払い方法をご確認のうえ、更新をお願いいたします。更新されない場合、サービスが一時停止される可能性があります。</p>
      <a href="${APP_URL}/dashboard/credits" style="display:inline-block;padding:12px 32px;background:#fe2858;color:#fff;border-radius:8px;font-size:1rem;font-weight:700;text-decoration:none;margin-top:16px;">お支払い方法を更新</a>
    `,
  };

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: SUBJECT_MAP[type],
      html: `
        <div style="background:#272727;padding:40px 0 32px 0;text-align:center;font-family:sans-serif;color:#fff;">
          <div style="max-width:480px;margin:0 auto;background:#1a1a1a;border-radius:16px;padding:32px 24px 24px 24px;box-shadow:0 4px 24px rgba(0,0,0,0.12);text-align:left;">
            ${bodyMap[type]}
            <hr style="border:none;border-top:1px solid #333;margin:24px 0;" />
            <p style="color:#666;font-size:0.85rem;text-align:center;">
              HookHack - <a href="${APP_URL}" style="color:#fe2858;text-decoration:none;">hook-hack.com</a>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error(`[Resend] Failed to send ${type} email to ${email}:`, error);
      return { success: false, error };
    }
    console.log(`[Resend] Sent ${type} email to ${email}`);
    return { success: true, data };
  } catch (err) {
    console.error(`[Resend] Exception sending ${type} email:`, err);
    return { success: false, error: err };
  }
}

/** Escape HTML to prevent XSS in email templates */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
