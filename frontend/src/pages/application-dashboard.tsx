import { JobsTable } from "../jobs-table/jobs-table";
import { useJobs } from "../use-jobs";

export function ApplicationDashboard() {
  const { data: jobs, isLoading, isError } = useJobs();

  if (isLoading) return <p>Loading applications…</p>;
  if (isError) return <p>Couldn't load applications.</p>;

  return <JobsTable jobs={jobs || []} />;
}
