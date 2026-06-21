import { useQuery } from "@tanstack/react-query";

import type { Job } from "./types";

async function fetchJobs(): Promise<Job[]> {
  const res = await fetch("http://localhost:8000/applications");
  if (!res.ok) throw new Error(`HTTP ${res.status}`); // so errors register as errors
  return res.json();
}

export function useJobs() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchJobs,
  });
}
