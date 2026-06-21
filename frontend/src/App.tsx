import "./App.css";
import { JobsForm } from "./jobs-form/jobs-form";
import { JobsTable } from "./jobs-table/jobs-table";
import { useJobs } from "./use-jobs";

function App() {
  const { data: jobs, isLoading, isError } = useJobs();

  if (isLoading) return <p>Loading applications…</p>;
  if (isError) return <p>Couldn't load applications.</p>;

  return (
    <>
      <h1>Job Application Tracker</h1>
      <JobsTable jobs={jobs || []} />
      <JobsForm />
    </>
  );
}

export default App;
