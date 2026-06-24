import { JobsTable } from "../components/jobs-table/jobs-table";
import { useJobs } from "../hooks/use-jobs";

export function ApplicationDashboard() {
  const { data: jobs, isLoading, isError } = useJobs();

  if (isLoading) return <p>Loading applications…</p>;
  if (isError) return <p>Couldn't load applications.</p>;

  return <JobsTable jobs={jobs || []} />;
}
