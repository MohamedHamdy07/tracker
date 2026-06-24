import { useQuery } from "@tanstack/react-query";
import type { StatusCount } from "../types";

async function fetchStatusCounts(): Promise<StatusCount[]> {
  const res = await fetch("http://localhost:8000/analytics/status-counts");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useStatusCounts() {
  return useQuery({
    queryKey: ["statusCounts"],
    queryFn: fetchStatusCounts,
  });
}
