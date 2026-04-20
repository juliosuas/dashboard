import Link from "next/link";
import type { IssueItem } from "@/lib/github/issues";

export function IssueRow({ item }: { item: IssueItem }) {
  return (
    <Link
      href={item.url}
      target="_blank"
      className="flex items-center gap-3 border-b px-4 py-2 text-sm hover:bg-accent"
    >
      <div className="w-32 text-xs text-muted-foreground">{item.repo}</div>
      <div className="flex-1 truncate">
        <span className="text-muted-foreground">#{item.number}</span>{" "}
        {item.title}
      </div>
      <div className="flex gap-1">
        {item.labels.slice(0, 3).map((l) => (
          <span
            key={l.name}
            className="rounded bg-muted px-1 text-[10px]"
            style={{ color: `#${l.color}` }}
          >
            {l.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
