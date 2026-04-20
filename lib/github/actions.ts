import { getOctokit, githubCache } from "./client";

export type ReviewEvent = "APPROVE" | "REQUEST_CHANGES" | "COMMENT";

export async function submitReview(
  owner: string,
  repo: string,
  number: number,
  input: { event: ReviewEvent; body?: string },
): Promise<{ id: number; state: string }> {
  const o = getOctokit();
  const { data } = await o.request(
    "POST /repos/{owner}/{repo}/pulls/{num}/reviews",
    {
      owner,
      repo,
      num: number,
      event: input.event,
      body: input.body,
    },
  );
  githubCache.invalidateAll();
  return { id: data.id, state: data.state };
}

export async function mergePr(
  owner: string,
  repo: string,
  number: number,
  method: "merge" | "squash" | "rebase" = "squash",
): Promise<{ merged: boolean; message: string }> {
  const o = getOctokit();
  const { data } = await o.request(
    "PUT /repos/{owner}/{repo}/pulls/{num}/merge",
    { owner, repo, num: number, merge_method: method },
  );
  githubCache.invalidateAll();
  return { merged: data.merged, message: data.message };
}

export async function postComment(
  owner: string,
  repo: string,
  number: number,
  body: string,
): Promise<void> {
  const o = getOctokit();
  await o.request("POST /repos/{owner}/{repo}/issues/{num}/comments", {
    owner,
    repo,
    num: number,
    body,
  });
  githubCache.invalidateAll();
}
