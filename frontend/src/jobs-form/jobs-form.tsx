/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

export function JobsForm() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("");

  return (
    <form>
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
