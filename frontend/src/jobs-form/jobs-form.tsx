import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function JobsForm() {
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
    const date = new Date();
    const newJob = {
      companyName: companyName,
      jobTitle: jobTitle,
      status: status,
      date: date.toLocaleDateString(),
    };
    mutation.mutate(newJob);
    setCompanyName("");
    setJobTitle("");
    setStatus("Applied");
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}
