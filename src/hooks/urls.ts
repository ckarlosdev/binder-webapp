const base = "https://checklist-api-8j62.onrender.com/api/v1";

export const getJobsURL = () => `${base}/job`;
export const getJobByIdURL = (jobId: string) => `${base}/job/${jobId}`;

export const getDrByJobNumberURL = (jobNumber: string) =>
  `${base}/dailyReport/job/${jobNumber}`;

export const getDrGralURL = (jobNumber: string) =>
  `${base}/dailyReport/gral/${jobNumber}`;
