import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Job } from "../types";
import "./jobs-table.css";
import Button from "@mui/material/Button";

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (jobId: number) => {
      // id comes in as the argument
      const response = await fetch(
        `http://localhost:8000/applications/${jobId}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // 204 No Content — nothing to parse, return nothing
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => console.error("Error deleting job:", error),
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Job Title</th>
          <th>Application Status</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.companyName}</td>
            <td>{job.jobTitle}</td>
            <td>{job.status}</td>
            <td>
              <Button
                variant="outlined"
                onClick={() => deleteMutation.mutate(job.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
