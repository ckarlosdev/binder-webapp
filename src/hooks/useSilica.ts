import { useQuery } from "@tanstack/react-query";
import type { SilicaReport } from "../types";
import { api } from "./apiConfig";

const querySilica = async (jobId: number): Promise<SilicaReport[]> => {
  const { data } = await api.get<SilicaReport[]>(`v1/silica/reports/${jobId}`);
  return data;
};

function useSilica(jobId: number) {
  return useQuery({
    queryKey: ["silicaReports", jobId],
    queryFn: () => querySilica(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}

export default useSilica;
