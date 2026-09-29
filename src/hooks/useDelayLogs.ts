import { useQuery } from "@tanstack/react-query";
import type { DelayLog } from "../types";
import { api } from "./apiConfig";

const queryDelayLog = async (jobId: number): Promise<DelayLog[]> => {
  const { data } = await api.get<DelayLog[]>(`/v2/delay-log/job/${jobId}`);
  return data;
};

function useDelayLog(jobId: number) {
  return useQuery({
    queryKey: ["delayLog", jobId],
    queryFn: () => queryDelayLog(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}

export default useDelayLog;
