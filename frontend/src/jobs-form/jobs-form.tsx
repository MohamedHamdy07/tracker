import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

export function JobsForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("Applied");

  const queryClient = useQueryClient();

  type JobInput = {
    companyName: string;
    jobTitle: string;
    status: string;
    date: string;
  };

  const mutation = useMutation<unknown, Error, JobInput>({
    mutationFn: async (newJob) => {
      const response = await fetch("http://localhost:8000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      console.log("Job added successfully", data);
    },
    onError: (error) => {
      console.error("Error creating job:", error);
    },
    onSettled: () => {
      console.log("Mutation completed.");
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 10);
    const newJob = {
      companyName: companyName,
      jobTitle: jobTitle,
      status: status,
      date: date,
    };
    mutation.mutate(newJob);
    setCompanyName("");
    setJobTitle("");
    setStatus("Applied");
    onClose();
  };

  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#1e1e1e",
          color: "rgba(255,255,255,0.87)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <h2 style={{ padding: "8px" }}>Add new application</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            gap: "8px",
          }}
        >
          <div>
            <label>Company Name </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Job Title </label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Status </label>
            <select
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Box>
    </Modal>
  );
}
