import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import type { ChangeOrder } from "../types";

const queryChangeOrder = async (jobId: number): Promise<ChangeOrder[]> => {
  const { data } = await api.get<ChangeOrder[]>(
    `/v2/job-management/change-order/job/${jobId}`,
  );
  return data;
};

function useChangeOrder(jobId: number) {
  return useQuery({
    queryKey: ["changeOrders", jobId],
    queryFn: () => queryChangeOrder(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}

export default useChangeOrder;
