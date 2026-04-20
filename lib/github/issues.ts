import { getOctokit, githubCache } from "./client";

export type IssueItem = {
  id: number;
  number: number;
  title: string;
  url: string;
  repo: string;
  state: "open" | "closed";
  author: string;
  labels: { name: string; color: string }[];
  updated_at: string;
};

export async function listIssues(): Promise<IssueItem[]> {
  return githubCache.getOrSet("issues:mine", async () => {
    const o = getOctokit();
    const queries = [
      "is:issue is:open assignee:@me archived:false",
      "is:issue is:open author:@me archived:false",
    ];
    const seen = new Set<number>();
    const out: IssueItem[] = [];
    for (const q of queries) {
      const { data } = await o.request("GET /search/issues", {
        q,
        per_page: 50,
        sort: "updated",
        order: "desc",
      });
      for (const it of data.items) {
        if (seen.has(it.id)) continue;
        seen.add(it.id);
        out.push({
          id: it.id,
          number: it.number,
          title: it.title,
          url: it.html_url,
          repo: (it.repository_url.match(/repos\/([^/]+\/[^/]+)$/) ?? [
            "",
            "unknown/unknown",
          ])[1],
          state: it.state as "open" | "closed",
          author: it.user?.login ?? "unknown",
          labels: (it.labels ?? []).map((l) => ({
            name: typeof l === "string" ? l : l.name ?? "",
            color: typeof l === "string" ? "888888" : l.color ?? "888888",
          })),
          updated_at: it.updated_at,
        });
      }
    }
    out.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    return out;
  }) as Promise<IssueItem[]>;
}
