import Link from "next/link";
import type { InboxItem } from "@/lib/github/inbox";
import { ReasonBadge } from "./reason-badge";
import { cn } from "@/lib/utils";

export function PrRow({
  item,
  focused,
  onFocus,
}: {
  item: InboxItem;
  focused: boolean;
  onFocus: () => void;
}) {
  return (
    <Link
      href={`/pr/${item.repo}/${item.number}`}
      onMouseEnter={onFocus}
      className={cn(
        "flex items-center gap-3 border-b px-4 py-2 text-sm",
        focused && "bg-accent",
      )}
    >
      <div className="w-20 text-xs text-muted-foreground">{item.repo}</div>
      <ReasonBadge reason={item.reason} />
      <div className="flex-1 truncate">
        <span className="text-muted-foreground">#{item.number}</span>{" "}
        {item.title}
      </div>
      <div className="text-xs text-muted-foreground">@{item.author}</div>
    </Link>
  );
}
