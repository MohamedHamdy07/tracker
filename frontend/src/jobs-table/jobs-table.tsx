import type { Job } from "../types";
import "./jobs-table.css";

export function JobsTable({ jobs }: { jobs: Job[] }) {
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
          <tr key={job.companyName}>
            <td>{job.companyName}</td>
            <td>{job.jobTitle}</td>
            <td>{job.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
