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

export type DailyReportView = {
  dailyReportId: number | null;
  date: string;
  foreman?: string;
  userName?: string;
  description: string;
  manOther: string;
  equipmentOther: string;
  issues: string;
  employees: DREmployee[];
  equipments: DREquipment[];
  rentals: DRRental[];
  tools: DRTool[];
  dumpsters: DrDumpster[];
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



export type AuthUser = {
  email: string;
  fullName: string;
  id: string;
  roles: Role[];
};

export type Role = {
  id: number;
  name: string;
};

export type DREmployee = {
  drEmployeesId?: number | null;
  dailyReportId: number | null;
  employeesId: number | null;
  inHour: string;
  outHour: string;
  lunch: boolean;
  ppe: boolean;
  comment: string;
};

export type DREquipment = {
  drEquipmentsId: number | null;
  dailyReportId: number | null;
  equipmentsId: number;
  employeesId: number | null;
  type: string;
  initialHour: string;
  newHour: string;
};

export type DRRental = {
  temporalId: string;
  drRentalsId: number | null;
  dailyReportId: number | null;
  employeesId: number | null;
  equipmentType: string;
  equipmentName: string;
  company: string;
  equipmentNumber: string;
  odometer: number;
};

export type DRTool = {
  temporalId: string;
  drToolId: number | null;
  dailyReportId: number | null;
  qty: number | "";
  name: string;
  other: string;
  comments: string;
};

export type DrDumpster = {
  drDumpstersId: number | null;
  sourceDumpster: string;
  sizeDumpster: string;
  typeDumpster: String;
  quantity: number | 0;
};

export type ChangeOrder = {
  id: number | null;
  jobId: number | null;
  employeeId: number | null;
  orderDate: string;
  orderNumber: number;
  amount: number;
  orderStatus: string;
  tasks: Task[];
  signatures: Signature[];
};

export type Signature = {
  id: number;
  signatureRole: string;
  filePath: string;
};

export type Task = {
  temporalId: string;
  id: number | null;
  taskName: string;
  taskDescription: string;
  foreman: number;
  labor: number;
  other: number;
  totalHours: number;
  comments: string;
  equipmentComments: string;
  toolComments: string;
  dumpsterComments: string;
  equipments: TaskEquipment[];
  tools: TaskTool[];
  dumpsters: TaskDumpster[];
};

export type TaskEquipment = {
  temporalId: string;
  id: number | null;
  equipmentName: string;
  quantity: number;
};

export type TaskTool = {
  temporalId: string;
  id: number | null;
  toolName: string;
  quantity: number;
};

export type TaskDumpster = {
  temporalId: string;
  id: number | null;
  materialType: string;
  dumpsterSize: string;
  quantity: number;
};

export interface DriveFile {
  temporalId: string;
  id: number | null;
  jobId: number | null;
  docType: string;
  customName: string;
  driveUrl: string;
}

export interface Incident {
  temporalId: string;
  id: number | null;
  jobId: number | null;
  employeeId: number | null;
  incType: string;
  customName: string;
  date: string;
  comment: string;
  user: string;
}

