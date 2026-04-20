"use client";
import useSWR from "swr";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export function useSettings() {
  const { data } = useSWR<{ settings: Record<string, string> }>(
    "/api/settings",
    fetcher,
  );
  return data?.settings ?? null;
}
