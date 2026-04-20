"use client";
import useSWR from "swr";
import type { IssueItem } from "@/lib/github/issues";
import { IssueRow } from "@/components/issue-row";
import { EmptyState } from "@/components/empty-state";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function IssuesPage() {
  const { data, mutate } = useSWR<{ items: IssueItem[] }>(
    "/api/issues",
    fetcher,
    { refreshInterval: 60_000 },
  );
  if (!data) return <div className="p-8">Loading issues…</div>;
  if (data.items.length === 0)
    return <EmptyState title="No open issues assigned to you" />;
  return (
    <div>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-semibold">Issues</h2>
        <button className="text-xs hover:underline" onClick={() => mutate()}>
          Refresh
        </button>
      </header>
      {data.items.map((it) => (
        <IssueRow key={it.id} item={it} />
      ))}
    </div>
  );
}
