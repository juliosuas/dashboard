import Database from "better-sqlite3";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export type Db = Database.Database;

export function openDb(path: string): Db {
  mkdirSync(dirname(resolve(path)), { recursive: true });
  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

export function runMigrations(db: Db): void {
  const schema = readFileSync(resolve(__dirname, "schema.sql"), "utf8");
  // Split into individual statements and run each (better-sqlite3 prepare takes one stmt).
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const tx = db.transaction(() => {
    for (const stmt of statements) db.prepare(stmt).run();
  });
  tx();
}

let singleton: Db | null = null;
export function getDb(): Db {
  if (singleton) return singleton;
  const path = process.env.DB_PATH ?? "./data/orchestrator.db";
  singleton = openDb(path);
  runMigrations(singleton);
  return singleton;
}
