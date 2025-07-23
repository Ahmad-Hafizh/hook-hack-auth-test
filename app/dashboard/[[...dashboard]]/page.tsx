import React from "react";

export default function DashboardCatchAllPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard Catch-All Route</h1>
      <p className="mb-2">
        This page handles all routes under <code>/dashboard/*</code>.
      </p>
    </div>
  );
}
