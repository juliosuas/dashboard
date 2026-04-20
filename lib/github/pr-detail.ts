import { getOctokit, githubCache } from "./client";

export type PrFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  patch: string | null;
};

export type PrCheck = {
  name: string;
  status: string;
  conclusion: string | null;
};

export type PrDetail = {
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  mergeable: boolean | null;
  mergeable_state: string;
  head_sha: string;
  head_ref: string;
  base_ref: string;
  author: string;
  additions: number;
  deletions: number;
  changed_files: number;
  draft: boolean;
  url: string;
  files: PrFile[];
  checks: PrCheck[];
};

export async function getPrDetail(
  owner: string,
  repo: string,
  number: number,
): Promise<PrDetail> {
  return githubCache.getOrSet(`pr:${owner}/${repo}#${number}`, async () => {
    const o = getOctokit();
    const [{ data: pr }, { data: files }] = await Promise.all([
      o.request("GET /repos/{owner}/{repo}/pulls/{num}", {
        owner,
        repo,
        num: number,
      }),
      o.request("GET /repos/{owner}/{repo}/pulls/{num}/files", {
        owner,
        repo,
        num: number,
      }),
    ]);
    const { data: checks } = await o.request(
      "GET /repos/{owner}/{repo}/commits/{sha}/check-runs",
      { owner, repo, sha: pr.head.sha },
    );
    return {
      number: pr.number,
      title: pr.title,
      body: pr.body,
      state: pr.state as "open" | "closed",
      mergeable: pr.mergeable ?? null,
      mergeable_state: pr.mergeable_state,
      head_sha: pr.head.sha,
      head_ref: pr.head.ref,
      base_ref: pr.base.ref,
      author: pr.user?.login ?? "unknown",
      additions: pr.additions,
      deletions: pr.deletions,
      changed_files: pr.changed_files,
      draft: pr.draft,
      url: pr.html_url,
      files: (files as PrFile[]).map((f) => ({
        filename: f.filename,
        status: f.status,
        additions: f.additions,
        deletions: f.deletions,
        patch: f.patch ?? null,
      })),
      checks: (checks.check_runs as PrCheck[]).map((c) => ({
        name: c.name,
        status: c.status,
        conclusion: c.conclusion ?? null,
      })),
    };
  }) as Promise<PrDetail>;
}
