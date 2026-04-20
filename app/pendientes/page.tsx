"use client";
import useSWR from "swr";
import type { Pendiente } from "@/lib/db/pendientes";
import { PendienteItem } from "@/components/pendiente-item";
import { NewPendienteModal } from "@/components/new-pendiente-modal";
import { EmptyState } from "@/components/empty-state";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function PendientesPage() {
  const { data, mutate } = useSWR<{ items: Pendiente[] }>(
    "/api/pendientes",
    fetcher,
  );

  async function toggle(id: number) {
    await fetch(`/api/pendientes/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ toggle: true }),
    });
    mutate();
  }
  async function del(id: number) {
    await fetch(`/api/pendientes/${id}`, { method: "DELETE" });
    mutate();
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-semibold">Pendientes</h2>
        <span className="text-xs text-muted-foreground">
          Press <kbd className="rounded border px-1">n</kbd> to add
        </span>
      </header>
      <NewPendienteModal onCreated={() => mutate()} />
      {!data ? (
        <div className="p-8">Loading…</div>
      ) : data.items.length === 0 ? (
        <EmptyState title="No pendientes" hint="Press n to add one" />
      ) : (
        data.items.map((p) => (
          <PendienteItem
            key={p.id}
            p={p}
            onToggle={() => toggle(p.id)}
            onDelete={() => del(p.id)}
          />
        ))
      )}
    </div>
  );
}
