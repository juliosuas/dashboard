import type { Db } from "./client";

export type LinkedKind = "pr" | "issue";

export type Pendiente = {
  id: number;
  title: string;
  body: string | null;
  linked_url: string | null;
  linked_kind: LinkedKind | null;
  done: boolean;
  created_at: string;
  done_at: string | null;
};

type Row = Omit<Pendiente, "done"> & { done: 0 | 1 };

function rowToPendiente(r: Row): Pendiente {
  return { ...r, done: r.done === 1 };
}

export type CreateInput = {
  title: string;
  body?: string;
  linked_url?: string;
  linked_kind?: LinkedKind;
};

export function createPendiente(db: Db, input: CreateInput): number {
  const info = db
    .prepare(
      `INSERT INTO pendientes (title, body, linked_url, linked_kind)
       VALUES (?, ?, ?, ?)`,
    )
    .run(
      input.title,
      input.body ?? null,
      input.linked_url ?? null,
      input.linked_kind ?? null,
    );
  return Number(info.lastInsertRowid);
}

export function listPendientes(
  db: Db,
  opts: { done?: boolean } = {},
): Pendiente[] {
  const rows =
    opts.done === undefined
      ? db
          .prepare("SELECT * FROM pendientes ORDER BY done ASC, created_at DESC")
          .all()
      : db
          .prepare(
            "SELECT * FROM pendientes WHERE done = ? ORDER BY created_at DESC",
          )
          .all(opts.done ? 1 : 0);
  return (rows as Row[]).map(rowToPendiente);
}

export function togglePendiente(db: Db, id: number): void {
  db.prepare(
    `UPDATE pendientes SET done = 1 - done,
     done_at = CASE WHEN done = 0 THEN datetime('now') ELSE NULL END
     WHERE id = ?`,
  ).run(id);
}

export type UpdateInput = Partial<
  Pick<Pendiente, "title" | "body" | "linked_url" | "linked_kind">
>;

export function updatePendiente(db: Db, id: number, patch: UpdateInput): void {
  const fields: string[] = [];
  const values: unknown[] = [];
  for (const [k, v] of Object.entries(patch)) {
    fields.push(`${k} = ?`);
    values.push(v);
  }
  if (fields.length === 0) return;
  values.push(id);
  db.prepare(
    `UPDATE pendientes SET ${fields.join(", ")} WHERE id = ?`,
  ).run(...values);
}

export function deletePendiente(db: Db, id: number): void {
  db.prepare("DELETE FROM pendientes WHERE id = ?").run(id);
}
