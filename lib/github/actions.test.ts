import { beforeEach, describe, expect, test } from "vitest";
import { submitReview, mergePr } from "./actions";
import { githubCache } from "./client";

describe("actions", () => {
  beforeEach(() => {
    process.env.GITHUB_TOKEN = "ghp_fake";
    githubCache.invalidateAll();
  });

  test("submitReview posts approve event", async () => {
    const res = await submitReview("acme", "web", 42, {
      event: "APPROVE",
      body: "LGTM",
    });
    expect(res.id).toBe(999);
  });

  test("mergePr returns merged=true", async () => {
    const res = await mergePr("acme", "web", 42, "squash");
    expect(res.merged).toBe(true);
  });
});
