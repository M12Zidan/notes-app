"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ApiTester({ endpoint, method, sample, schema, requireAuth = false }) {
  const [form, setForm] = useState(() => ({ ...sample }));
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      let url = endpoint;
      const headers = { "Content-Type": "application/json" };

      if (requireAuth && token.trim()) {
        headers["Authorization"] = `Bearer ${token.trim()}`;
      }

      const options = {
        method,
        headers,
      };

      if (method === "GET" || method === "HEAD") {
        const query = new URLSearchParams(form).toString();
        if (query) url += `?${query}`;
      } else {
        options.body = JSON.stringify(form);
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResult({ status: res.status, data });
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const getInputType = (key) => {
    const type = schema[key]?.type || "string";
    if (type === "email" || key.toLowerCase().includes("email")) return "email";
    if (type === "password" || key.toLowerCase().includes("password")) return "password";
    return "text";
  };

  return (
    <div className="mt-4 space-y-4">
      {requireAuth && (
        <div className="space-y-1">
          <Label htmlFor="token">Authorization Token</Label>
          <Input
            id="token"
            type="text"
            placeholder="Masukkan token dari login"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
      )}

      {Object.keys(form).map((key) => (
        <div key={key} className="space-y-1">
          <Label htmlFor={key} className="capitalize">
            {schema[key]?.label || key.replaceAll("_", " ")}
          </Label>
          <Input
            id={key}
            type={getInputType(key)}
            value={form[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={`Masukkan ${schema[key]?.label || key}`}
          />
        </div>
      ))}

      <Button onClick={handleSubmit} disabled={loading} className="mt-2">
        {loading ? "Loading..." : "Kirim Request"}
      </Button>

      {result && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Status: {result.status || "Error"}
          </p>
          <pre className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(result.data || result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
