import React from "react";

export default function DashboardCatchAllPage({
  params,
}: {
  params: { dashboard?: string[] };
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard Catch-All Route</h1>
      <p className="mb-2">
        This page handles all routes under <code>/dashboard/*</code>.
      </p>
      <div className="bg-gray-100 rounded p-4">
        <strong>Params:</strong> {JSON.stringify(params.dashboard || [])}
      </div>
    </div>
  );
}
