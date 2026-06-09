import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DriveFile } from "../types";

type OthersStore = {
  showModal: boolean;
  fileData: DriveFile;
  filesList: DriveFile[];

  setShowModal: (show: boolean) => void;
  setFileData: <K extends keyof DriveFile>(key: K, value: DriveFile[K]) => void;
  resetFileData: () => void;
  setFileList: () => void;
  removeFile: (temporalId: string) => void;
  fileToUpdate: (file: DriveFile) => void;
  setFullData: (data: DriveFile[]) => void;
};

const initialData: DriveFile = {
  temporalId: "",
  id: null,
  jobId: null,
  docType: "",
  customName: "",
  driveUrl: "",
};

export const useOthersStore = create<OthersStore>()(
  persist(
    (set) => ({
      showModal: false,
      fileData: initialData,
      filesList: [],

      setShowModal: (show) => set({ showModal: show }),
      setFileData: (key, value) =>
        set((state) => ({
          fileData: {
            ...state.fileData,
            [key]: value,
          },
        })),
      resetFileData: () =>
        set(() => ({
          fileData: initialData,
        })),
      setFileList: () =>
        set((state) => {
          let currentFile = { ...state.fileData };

          if (!currentFile.temporalId) {
            currentFile.temporalId = crypto.randomUUID(); // 👈 Genera algo como: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
          }

          const exists = state.filesList.some(
            (f) => f.temporalId === currentFile.temporalId,
          );

          if (exists) {
            return {
              filesList: state.filesList.map((f) =>
                f.temporalId === currentFile.temporalId ? currentFile : f,
              ),
            };
          } else {
            return {
              filesList: [currentFile, ...state.filesList],
            };
          }
        }),

      removeFile: (temporalId) =>
        set((state) => ({
          filesList: state.filesList.filter((f) => f.temporalId !== temporalId),
        })),

      fileToUpdate: (file) => set({ fileData: file }),
      setFullData: (data: Omit<DriveFile, "temporalId">[]) =>
        set(() => ({
          filesList: data.map((file) => ({
            ...file,
            temporalId: crypto.randomUUID(),
          })),
        })),
    }),
    {
      name: "others-storage",
    },
  ),
);
