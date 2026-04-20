"use client";
import * as React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function SettingsPage() {
  const { data, mutate } = useSWR<{ settings: Record<string, string> }>(
    "/api/settings",
    fetcher,
  );
  const [form, setForm] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (data?.settings) setForm(data.settings);
  }, [data?.settings]);

  async function save() {
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    toast.success("Saved.");
    mutate();
  }

  if (!data) return <div className="p-8">Loading…</div>;
  return (
    <div className="max-w-2xl space-y-4 p-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      {Object.keys(data.settings).map((k) => (
        <label key={k} className="block space-y-1">
          <div className="text-sm font-medium">{k}</div>
          <Input
            value={form[k] ?? ""}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          />
        </label>
      ))}
      <Button onClick={save}>Save</Button>
    </div>
  );
}
