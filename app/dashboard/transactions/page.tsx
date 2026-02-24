"use client";

import { TransactionsTable } from "../components/transactions-table";

export default function TransactionsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">取引履歴</h1>
        <p className="text-[13px] text-muted-foreground">過去の取引を確認できます</p>
      </div>

      <TransactionsTable />
    </div>
  );
}
