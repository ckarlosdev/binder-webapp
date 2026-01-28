import { useQuery } from "@tanstack/react-query";
import type { DemoChecklist } from "../types";
import { api } from "./apiConfig";

const queryDemoChecklist = async (
  jobNumber: string,
): Promise<DemoChecklist[]> => {
  const { data } = await api.get<DemoChecklist[]>(
    `v1/demoChecklist/job/${jobNumber}`,
  );
  return data;
};

function useDemoChecklist(jobNumber: string) {
  return useQuery({
    queryKey: ["demoCheklistReports", jobNumber],
    queryFn: () => queryDemoChecklist(jobNumber),
    enabled: !!jobNumber,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}

export default useDemoChecklist;
