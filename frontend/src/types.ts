export type Job = {
  id: number;
  companyName: string;
  jobTitle: string;
  status: "Applied" | "Interviewing" | "Offer" | "Rejected" | "Accepted";
  date: string;
};

export type StatusCount = {
  status: "Applied" | "Interviewing" | "Offer" | "Rejected" | "Accepted";
  count: number;
};
