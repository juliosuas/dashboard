import { describe, expect, test } from "vitest";
import { buildClaudeCommand } from "./claude-command-copy";

describe("buildClaudeCommand", () => {
  test("substitutes placeholders", () => {
    const cmd = buildClaudeCommand({
      template: 'cd {repo_dir} && claude "Work on {kind} #{number}: {title}"',
      repo_dir_root: "~/Projects/github",
      repo_name: "gstack",
      kind: "pr",
      number: 7,
      title: "Fix CI",
    });
    expect(cmd).toBe(
      'cd ~/Projects/github/gstack && claude "Work on pr #7: Fix CI"',
    );
  });

  test("escapes double quotes in title", () => {
    const cmd = buildClaudeCommand({
      template: "{title}",
      repo_dir_root: "",
      repo_name: "",
      kind: "pr",
      number: 1,
      title: 'Say "hi"',
    });
    expect(cmd).toBe('Say \\"hi\\"');
  });
});
