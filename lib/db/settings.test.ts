import { beforeEach, describe, expect, test } from "vitest";
import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { openDb, runMigrations } from "./client";
import { getSetting, setSetting, getAllSettings } from "./settings";

describe("settings", () => {
  let db: ReturnType<typeof openDb>;
  beforeEach(() => {
    const tmp = mkdtempSync(join(tmpdir(), "set-"));
    db = openDb(join(tmp, "t.db"));
    runMigrations(db);
  });

  test("seeded defaults are present", () => {
    expect(getSetting(db, "claude_command_template")).toContain("claude");
    expect(getSetting(db, "repo_dir_root")).toContain("Projects");
  });

  test("set + get round-trips", () => {
    setSetting(db, "claude_command_template", "custom {title}");
    expect(getSetting(db, "claude_command_template")).toBe("custom {title}");
  });

  test("getAllSettings returns every row", () => {
    const all = getAllSettings(db);
    expect(all.claude_command_template).toBeDefined();
    expect(all.repo_dir_root).toBeDefined();
  });
});
