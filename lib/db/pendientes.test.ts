import { beforeEach, describe, expect, test } from "vitest";
import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { openDb, runMigrations } from "./client";
import {
  createPendiente,
  listPendientes,
  togglePendiente,
  deletePendiente,
  updatePendiente,
} from "./pendientes";

describe("pendientes crud", () => {
  let db: ReturnType<typeof openDb>;

  beforeEach(() => {
    const tmp = mkdtempSync(join(tmpdir(), "pend-"));
    db = openDb(join(tmp, "t.db"));
    runMigrations(db);
  });

  test("create + list", () => {
    createPendiente(db, { title: "Review PR #42" });
    const all = listPendientes(db);
    expect(all).toHaveLength(1);
    expect(all[0].title).toBe("Review PR #42");
    expect(all[0].done).toBe(false);
  });

  test("list filters by done", () => {
    const id = createPendiente(db, { title: "a" });
    createPendiente(db, { title: "b" });
    togglePendiente(db, id);
    expect(listPendientes(db, { done: false })).toHaveLength(1);
    expect(listPendientes(db, { done: true })).toHaveLength(1);
  });

  test("update changes fields", () => {
    const id = createPendiente(db, { title: "old" });
    updatePendiente(db, id, { title: "new", body: "b" });
    const got = listPendientes(db)[0];
    expect(got.title).toBe("new");
    expect(got.body).toBe("b");
  });

  test("delete removes row", () => {
    const id = createPendiente(db, { title: "x" });
    deletePendiente(db, id);
    expect(listPendientes(db)).toHaveLength(0);
  });

  test("linked_url + linked_kind are stored", () => {
    createPendiente(db, {
      title: "Fix",
      linked_url: "https://github.com/a/b/pull/1",
      linked_kind: "pr",
    });
    const p = listPendientes(db)[0];
    expect(p.linked_kind).toBe("pr");
    expect(p.linked_url).toContain("pull/1");
  });
});
