export type Job = {
  jobsId: number;
  number: string;
  type: string;
  name: string;
  address: string;
  contractor: string;
  contact: string;
  status: string;
};

export type DailyReport = {
  dailyReportId: number;
  number: string;
  address: string;
  name: string;
  workingFor: string;
  date: string;
  foreman: string;
  crew: string;
  description: string;
  manTotal: string;
  manHoursTotal: string;
  manOther: string;
  equipmentTotal: string;
  equipHoursTotal: string;
  equipmentOther: string;
  issues: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  status: string;
};

export type DrGral = {
  dailyReportId: number;
  date: string;
  foreman: string;
  manTotal: string;
  equipmentTotal: string;
  photosTotal: number;
  toolsTotal: number;
  dumpstersCount: number;
};
