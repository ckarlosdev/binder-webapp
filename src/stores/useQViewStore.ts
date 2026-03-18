import { create } from "zustand";
import { persist } from "zustand/middleware";

type QViewStore = {
  showModal: boolean;
  dailyReportId: number | null;

  setShow: (show: boolean) => void;
  setDrId: (drId: number) => void;
};

export const useQViewStore = create<QViewStore>()(
  persist(
    (set) => ({
      showModal: false,
      dailyReportId: null,

      setShow: (show) => set({ showModal: show }),
      setDrId: (drId) => set({ dailyReportId: drId }),
    }),
    {
      name: "quickView-storage",
    },
  ),
);
