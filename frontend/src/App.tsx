import { Button } from "@mui/material";
import "./App.css";
import { JobsForm } from "./jobs-form/jobs-form";
import { JobsTable } from "./jobs-table/jobs-table";
import { useJobs } from "./use-jobs";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const { data: jobs, isLoading, isError } = useJobs();

  if (isLoading) return <p>Loading applications…</p>;
  if (isError) return <p>Couldn't load applications.</p>;

  return (
    <>
      <div className="table-header">
        <h1 style={{ flex: 1 }}>Job Application Tracker</h1>
        <Button
          variant="outlined"
          sx={{
            width: 40,
            height: 40,
            minWidth: 40,
            marginRight: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
          onClick={() => setOpen(!open)}
        >
          +
        </Button>
      </div>

      <JobsTable jobs={jobs || []} />
      <JobsForm open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default App;
