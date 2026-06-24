import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Job } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected", "Accepted"];

const statusColor: Record<string, "info" | "warning" | "success" | "error"> = {
  Applied: "info",
  Interviewing: "warning",
  Offer: "success",
  Accepted: "success",
  Rejected: "error",
};

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
        { method: "PATCH" },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => console.error("Error updating job:", error),
  });

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date Applied</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} hover>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.jobTitle}</TableCell>
              <TableCell>
                <Select
                  value={job.status}
                  variant="standard"
                  disableUnderline
                  onChange={(e) =>
                    updateMutation.mutate({
                      jobId: job.id,
                      new_status: e.target.value,
                    })
                  }
                  renderValue={(value) => (
                    <Chip
                      label={value}
                      color={statusColor[value]}
                      size="small"
                    />
                  )}
                >
                  {STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Button component="label" size="small">
                  Upload
                  <input type="file" hidden />
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  color="error"
                  size="small"
                  onClick={() => deleteMutation.mutate(job.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
