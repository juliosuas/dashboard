import { beforeEach, describe, expect, test } from "vitest";
import { getPrDetail } from "./pr-detail";
import { githubCache } from "./client";

describe("getPrDetail", () => {
  beforeEach(() => {
    process.env.GITHUB_TOKEN = "ghp_fake";
    githubCache.invalidateAll();
  });

  test("returns metadata + files + checks", async () => {
    const d = await getPrDetail("acme", "web", 42);
    expect(d.title).toBe("Fix flaky test");
    expect(d.mergeable).toBe(true);
    expect(d.files).toHaveLength(1);
    expect(d.files[0].filename).toBe("src/auth.ts");
    expect(d.checks[0].conclusion).toBe("success");
  });
});
