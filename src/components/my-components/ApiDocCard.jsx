"use client";
import { useState } from "react";
import ApiTester from "@/components/my-components/ApiTester";

export default function ApiDocCard({
  title,
  method,
  endpoint,
  description,
  request,
  response,
  sample,
  schema,
  requireAuth = false,
}) {
  const [showTester, setShowTester] = useState(false);

  return (
    <div className="border rounded-xl shadow p-5 bg-white dark:bg-zinc-900 space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      <div className="text-sm">
        <span className="font-semibold">{method}</span> {endpoint}
      </div>

      <div>
        <p className="font-medium mt-2">📥 Request Body:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-sm overflow-x-auto">
          {JSON.stringify(
            Object.fromEntries(
              Object.entries(request).map(([key, val]) => [key, val.type])
            ),
            null,
            2
          )}
        </pre>
      </div>

      <div>
        <p className="font-medium mt-2">📤 Sample Response:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-sm overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>

      <button
        onClick={() => setShowTester((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showTester ? "Tutup Tester" : "Coba Endpoint"}
      </button>

      {showTester && (
        <ApiTester
          endpoint={endpoint}
          method={method}
          sample={sample}
          schema={request}
          requireAuth={requireAuth}
        />
      )}
    </div>
  );
}
