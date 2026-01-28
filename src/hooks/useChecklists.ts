import { useQuery } from "@tanstack/react-query";
import type { ChecklistReport } from "../types";
import { api } from "./apiConfig";

const queryChecklist = async (jobId: number): Promise<ChecklistReport[]> => {
  const { data } = await api.get<ChecklistReport[]>(`v1/cl/job/${jobId}`);
  return data;
};

function useChecklist(jobId: number) {
  return useQuery({
    queryKey: ["cheklistReports", jobId],
    queryFn: () => queryChecklist(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}

export default useChecklist;
