export type BuildInput = {
  template: string;
  repo_dir_root: string;
  repo_name: string;
  kind: "pr" | "issue";
  number: number;
  title: string;
};

export function buildClaudeCommand(i: BuildInput): string {
  const repo_dir = i.repo_dir_root
    ? `${i.repo_dir_root.replace(/\/$/, "")}/${i.repo_name}`
    : i.repo_name;
  const safeTitle = i.title.replace(/"/g, '\\"');
  return i.template
    .replaceAll("{repo_dir}", repo_dir)
    .replaceAll("{repo_name}", i.repo_name)
    .replaceAll("{kind}", i.kind)
    .replaceAll("{number}", String(i.number))
    .replaceAll("{title}", safeTitle);
}
