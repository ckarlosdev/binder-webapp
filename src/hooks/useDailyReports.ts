import { useQuery } from "@tanstack/react-query";
import type { DailyReportView, DrGral } from "../types";
import { api } from "./apiConfig";

const queryReport = async (dailyReportId: number): Promise<DailyReportView> => {
  const { data } = await api.get(`v1/dailyReport/dto/${dailyReportId}`);
  return data;
};

export function useDailyReportData(dailyReportId: number, options?: any) {
  return useQuery<DailyReportView>({
    queryKey: ["dailyReport", dailyReportId],
    queryFn: () => queryReport(dailyReportId!),
    enabled: !!dailyReportId,
    retry: false,
    ...options,
  });
}

const queryDailyReport = async (jobNumber: string): Promise<DrGral[]> => {
  const { data } = await api.get<DrGral[]>(`v1/dailyReport/gral/${jobNumber}`);
  return data;
};

export function useDailyReport(jobNumber: string) {
  return useQuery({
    queryKey: ["dailyReports", jobNumber],
    queryFn: () => queryDailyReport(jobNumber),
    enabled: !!jobNumber,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}
