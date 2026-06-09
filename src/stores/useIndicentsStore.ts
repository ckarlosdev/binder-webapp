import type { Incident } from "../types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type IncidentStore = {
  showModal: boolean;
  incidentData: Incident;
  incidentList: Incident[];

  setShowModal: (show: boolean) => void;
  // setIncidentData: <K extends keyof Incident>(
  //   key: K,
  //   value: Incident[K],
  // ) => void;

  setIncidentData: (
    update: Partial<Incident> | ((state: Incident) => Partial<Incident>),
  ) => void;
  resetIncidentData: () => void;
  setIncidentList: () => void;
  removeIncident: (temporalId: string) => void;
  incidentToUpdate: (incident: Incident) => void;
  setFullData: (data: Incident[]) => void;
};

const getTodayDate = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .split("T")[0];
  return localISOTime;
};

const initialData: Incident = {
  temporalId: "",
  id: null,
  jobId: null,
  employeeId: null,
  incType: "",
  customName: "",
  date: getTodayDate(),
  comment: "",
  user: "",
};

export const useIncidentStore = create<IncidentStore>()(
  persist(
    (set) => ({
      showModal: false,
      incidentData: initialData,
      incidentList: [],

      setShowModal: (show) => set({ showModal: show }),
      // setIncidentData: (key, value) =>
      //   set((state) => ({
      //     incidentData: {
      //       ...state.incidentData,
      //       [key]: value,
      //     },
      //   })),
      setIncidentData: (update) =>
        set((state) => ({
          incidentData: {
            ...state.incidentData,
            ...(typeof update === "function"
              ? update(state.incidentData)
              : update),
          },
        })),
      resetIncidentData: () =>
        set(() => ({
          incidentData: initialData,
        })),
      setIncidentList: () =>
        set((state) => {
          let currentIncident = { ...state.incidentData };

          if (!currentIncident.temporalId) {
            currentIncident.temporalId = crypto.randomUUID();
          }

          const exists = state.incidentList.some(
            (f) => f.temporalId === currentIncident.temporalId,
          );

          if (exists) {
            return {
              incidentList: state.incidentList.map((f) =>
                f.temporalId === currentIncident.temporalId
                  ? currentIncident
                  : f,
              ),
            };
          } else {
            return {
              incidentList: [currentIncident, ...state.incidentList],
            };
          }
        }),
      removeIncident: (temporalId) =>
        set((state) => ({
          incidentList: state.incidentList.filter(
            (f) => f.temporalId !== temporalId,
          ),
        })),
      incidentToUpdate: (incident) => set({ incidentData: incident }),
      setFullData: (data: Omit<Incident, "temporalId">[]) =>
        set(() => ({
          incidentList: data.map((incident) => ({
            ...incident,
            temporalId: crypto.randomUUID(),
          })),
        })),
    }),
    {
      name: "incident-storage",
    },
  ),
);
