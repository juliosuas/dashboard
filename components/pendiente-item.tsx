"use client";
import { Checkbox } from "@/components/ui/checkbox";
import type { Pendiente } from "@/lib/db/pendientes";

export function PendienteItem({
  p,
  onToggle,
  onDelete,
}: {
  p: Pendiente;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b px-4 py-2 text-sm">
      <Checkbox checked={p.done} onCheckedChange={onToggle} />
      <div className="flex-1">
        <div
          className={
            p.done ? "line-through text-muted-foreground" : undefined
          }
        >
          {p.title}
        </div>
        {p.linked_url ? (
          <a
            className="text-xs text-muted-foreground underline"
            href={p.linked_url}
            target="_blank"
            rel="noreferrer"
          >
            {p.linked_url}
          </a>
        ) : null}
      </div>
      <button
        onClick={onDelete}
        className="text-xs text-muted-foreground hover:text-destructive"
      >
        Delete
      </button>
    </div>
  );
}
