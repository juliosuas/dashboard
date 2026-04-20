"use client";
import useSWR from "swr";
import { PrInboxList } from "@/components/pr-inbox-list";
import type { InboxItem } from "@/lib/github/inbox";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function InboxPage() {
  const { data, mutate, isLoading } = useSWR<{ items: InboxItem[] }>(
    "/api/prs/inbox",
    fetcher,
    { refreshInterval: 60_000 },
  );
  if (isLoading || !data) {
    return (
      <div className="p-8 text-muted-foreground">Loading inbox…</div>
    );
  }
  return (
    <div>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-semibold">PR Inbox</h2>
        <button
          className="text-xs text-muted-foreground hover:underline"
          onClick={() => mutate()}
        >
          Refresh
        </button>
      </header>
      <PrInboxList items={data.items} />
    </div>
  );
}
