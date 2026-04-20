import { beforeEach, describe, expect, test } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { openDb, runMigrations } from "./client";

describe("db client", () => {
  let dbPath: string;
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "orch-"));
    dbPath = join(tmpDir, "test.db");
  });

  test("openDb + runMigrations creates tables", () => {
    const db = openDb(dbPath);
    runMigrations(db);
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
      .all() as { name: string }[];
    expect(tables.map((t) => t.name)).toEqual(
      expect.arrayContaining(["pendientes", "settings"]),
    );
    db.close();
    rmSync(tmpDir, { recursive: true, force: true });
  });

  test("runMigrations seeds default settings", () => {
    const db = openDb(dbPath);
    runMigrations(db);
    const row = db
      .prepare("SELECT value FROM settings WHERE key = ?")
      .get("claude_command_template") as { value: string } | undefined;
    expect(row?.value).toContain("claude");
    db.close();
    rmSync(tmpDir, { recursive: true, force: true });
  });
});
