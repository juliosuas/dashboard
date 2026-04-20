import { Badge } from "@/components/ui/badge";

export function StatusBadge({ conclusion }: { conclusion: string | null }) {
  const map: Record<string, { label: string; className: string }> = {
    success: { label: "passing", className: "bg-green-600 text-white" },
    failure: { label: "failing", className: "bg-red-600 text-white" },
    neutral: { label: "neutral", className: "bg-gray-400 text-white" },
  };
  const v = map[conclusion ?? ""] ?? {
    label: conclusion ?? "pending",
    className: "bg-yellow-500 text-white",
  };
  return <Badge className={v.className}>{v.label}</Badge>;
}
