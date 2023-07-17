import { useMutation, useQuery } from "@tanstack/react-query";
import { CreaateTaskProps, TaskType, createTask, deleteTask, getTaskData } from "../Services/tasks";

export function getTasks () {
  const { data, error, isLoading, isError, refetch, status} = useQuery({ 
    queryKey: ['get-tasks'], 
    queryFn: async () =>{ 
      const { data } = await getTaskData();
      return data as TaskType[];
    } 
  }); 
  return { data, error, isLoading, isError, refetch, status}; 
}

export const createTaskUseMutation = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: async (values: CreaateTaskProps) => {
      return await createTask(values)
    },
    onSuccess, 
    onError
  })
}

export const deleteTaskUseMutation = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteTask(id)
    },
    onSuccess, 
    onError
  })
}