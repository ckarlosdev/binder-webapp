import { useQuery } from "@tanstack/react-query";
import type { HazardReport } from "../types";
import { api } from "./apiConfig";

const queryHazards = async (jobId: number): Promise<HazardReport[]> => {
  const { data } = await api.get<HazardReport[]>(`v1/pretask/job/${jobId}`);
  return data;
};

function useHazards(jobId: number) {
  return useQuery({
    queryKey: ["hazards", jobId],
    queryFn: () => queryHazards(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}

export default useHazards;