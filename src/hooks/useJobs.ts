import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import type { Job } from "../types";
import { useAuthStore } from "./authStore";

const queryJob = async (token: string): Promise<Job[]> => {
  const { data } = await api.get<Job[]>(`v1/job`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

function useJob() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["job", token],
    queryFn: () => queryJob(token!),
    enabled: !!token,
    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) return false;
      return failureCount < 3;
    },
  });
}

export default useJob;
