export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
      <div className="text-lg">{title}</div>
      {hint ? <div className="text-sm">{hint}</div> : null}
    </div>
  );
}
