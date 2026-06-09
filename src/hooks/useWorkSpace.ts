import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DriveFile, Incident } from "../types";
import { api } from "./apiConfig";

const createFile = async ({ data }: { data: DriveFile }) => {
  if (data.id) {
    return api.put(`v2/work-space/stored-file/${data.id}`, data);
  }
  return api.post(`v2/work-space/stored-file`, data);
};

export function useSaveFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFile,
    mutationKey: ["saveFile"],
    onSuccess: (response) => {
      const newId = response.data?.id;
      if (newId) {
        queryClient.invalidateQueries({ queryKey: ["storedFile", newId] });
      }
    },
  });
}

const queryGetFilesByJobId = async (jobId: number): Promise<DriveFile[]> => {
  const { data } = await api.get(`v2/work-space/stored-file/job/${jobId}`);
  return data;
};

export function getFilesbyJobId(jobId: number) {
  return useQuery({
    queryKey: ["storedFile", jobId],
    queryFn: () => queryGetFilesByJobId(jobId),
    enabled: !!jobId,
    retry: false,
  });
}

const deleteFile = async (id: number) => {
  return api.delete(`v2/work-space/stored-file/${id}`);
};

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    mutationKey: ["deleteStoredFile"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storedFile"] });
    },
  });
}

const createIncident = async ({ data }: { data: Incident }) => {
  if (data.id) {
    return api.put(`v2/work-space/incident/${data.id}`, data);
  }
  return api.post(`v2/work-space/incident`, data);
};

export function useSaveIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    mutationKey: ["saveIncident"],
    onSuccess: (response) => {
      const newId = response.data?.id;
      if (newId) {
        queryClient.invalidateQueries({ queryKey: ["incident", newId] });
      }
    },
  });
}

const queryGetIncidentsByJobId = async (jobId: number): Promise<Incident[]> => {
  const { data } = await api.get(`v2/work-space/incident/job/${jobId}`);
  return data;
};

export function getIncidentsbyJobId(jobId: number) {
  return useQuery({
    queryKey: ["incident", jobId],
    queryFn: () => queryGetIncidentsByJobId(jobId),
    enabled: !!jobId,
    retry: false,
  });
}

const deleteIncident = async (id: number) => {
  return api.delete(`v2/work-space/incident/${id}`);
};

export function useDeleteIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIncident,
    mutationKey: ["deleteIncident"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incident"] });
    },
  });
}
