CREATE TABLE IF NOT EXISTS pendientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT,
  linked_url TEXT,
  linked_kind TEXT CHECK (linked_kind IN ('pr', 'issue') OR linked_kind IS NULL),
  done INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  done_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_pendientes_done ON pendientes(done, created_at DESC);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT OR IGNORE INTO settings (key, value) VALUES
  ('claude_command_template', 'cd {repo_dir} && claude "Work on {kind} #{number}: {title}"'),
  ('repo_dir_root', '~/Projects/github');
