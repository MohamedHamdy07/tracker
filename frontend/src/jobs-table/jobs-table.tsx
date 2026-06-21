import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Job } from "../types";
import "./jobs-table.css";
import Button from "@mui/material/Button";

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (jobId: number) => {
      const response = await fetch(
        `http://localhost:8000/applications/${jobId}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => console.error("Error deleting job:", error),
  });

  const updateMutation = useMutation<
    void,
    Error,
    { jobId: number; new_status: string }
  >({
    mutationFn: async ({ jobId, new_status }) => {
      const params = new URLSearchParams({ new_status });

      const response = await fetch(
        `http://localhost:8000/applications/${jobId}?${params}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: new_status }),
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => console.error("Error updating job:", error),
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Date Applied</th>
          <th>Company Name</th>
          <th>Job Title</th>
          <th>Application Status</th>
          <th>Resume</th>
          <th>Delete?</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.date}</td>
            <td>{job.companyName}</td>
            <td>{job.jobTitle}</td>
            <td>
              <select
                name="status"
                defaultValue={job.status}
                onChange={(e) =>
                  updateMutation.mutate({
                    jobId: job.id,
                    new_status: e.target.value,
                  })
                }
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
            </td>
            <td>
              <input type="file" />
            </td>
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
