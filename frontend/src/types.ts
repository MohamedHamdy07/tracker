export type Job = {
  id: number;
  companyName: string;
  jobTitle: string;
  status: "Applied" | "Interviewing" | "Offer" | "Rejected" | "Accepted";
};
