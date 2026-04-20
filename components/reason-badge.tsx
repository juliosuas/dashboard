import { Badge } from "@/components/ui/badge";
import type { InboxReason } from "@/lib/github/inbox";

const map: Record<InboxReason, string> = {
  "review-requested": "review",
  assigned: "assigned",
  authored: "yours",
};

export function ReasonBadge({ reason }: { reason: InboxReason }) {
  return <Badge variant="outline">{map[reason]}</Badge>;
}
