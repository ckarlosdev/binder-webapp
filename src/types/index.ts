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

export type HazardReport = {
  preTasksId: number | null;
  jobsId: number;
  userName: string;
  date: string;
  supervisor: string;
  comment: string;
};

export type SilicaReport = {
  silicaId: number | null;
  jobsId: number;
  employeesId: number;
  eventDate: string;
};

export type Employee = {
  employeesId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  status: string;
  title: string;
};

export type ChecklistReport = {
  equipmentsGoogleChecklistsId: number;
  jobsId: number;
  total: number;
  jobName: string;
  date: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  status: string;
  token: string;
};

export type DemoChecklist = {
  demoChecklistsId: number;
  checklistDate: string;
  buildingType: string;
  foreman: string;
  demoChecklistsStatus: string;
};
