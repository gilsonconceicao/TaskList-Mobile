import axios from 'axios'; 

const url = "http://192.168.100.123:5000";

export type TaskType = {
  id: string,
  title: string,
  description: string,
  created: string,
  updated: string
}

export type CreaateTaskProps = {
  title: string,
  description: string,
  created: string,
  updated: string
}

export async function getTaskData() {
  const response = await axios.get(`${url}/Task`);
  return response;
}

export async function createTask(payload: CreaateTaskProps) {
  return await axios.post(`${url}/Task`, payload);
}

export async function deleteTask(id: string) {
  return await axios.delete(`${url}/Task/${id}`);
}