import { useMutation, useQuery } from "@tanstack/react-query";
import { CreaateTaskProps, TaskType, postCreateTask, deleteTask, getTaskByIdData, getTaskData, putEditTask } from "../Services/tasks";

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

export function  useGetTaskById (taskId:string ) {
  const { data, error, isLoading, isError, refetch, status} = useQuery({ 
    enabled: !!taskId && taskId !== "newTask", 
    queryKey: ['get-task-by-id', taskId],  
    queryFn: async () =>{ 
      const { data } = await getTaskByIdData(taskId!);
      return data as TaskType as any; 
    } 
  }); 
  return { data, error, isLoading, isError, refetch, status}; 
}

export const createTaskUseMutation = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: async (values: CreaateTaskProps) => {
      return await postCreateTask(values)
    },
    onSuccess, 
    onError
  })
}

export const editTaskUseMutation = (id: string, onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: async (values: CreaateTaskProps) => {
      return await putEditTask(id, values)
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