import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import type { Job } from "../types";

const queryJob = async (): Promise<Job[]> => {
  const { data } = await api.get<Job[]>(`v1/job`);
  return data;
};

function useJob() {
  return useQuery({
    queryKey: ["job"],
    queryFn: queryJob,
    staleTime: 5 * 60 * 1000, // 5 minutos: considera los datos "frescos" y no parpadees
    gcTime: 10 * 60 * 1000, // Mantén en caché 10 min
    retry: false,
  });
}

export default useJob;
