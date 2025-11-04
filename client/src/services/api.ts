import axios from 'axios';
import type { ITask } from '../types';
import type { ILoginData, IRegisterData, IUserAuthResponse } from '../types';

// Define the base URL for your API
const API_URL = 'https://todolist-g5vz.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Type for new task data (omitting _id and timestamps)
type NewTaskData = {
  name: string;
  status: 'Incomplete' | 'Complete';
};
type UpdateTaskData = Partial<NewTaskData>;
// Fetch all tasks
export const getTasks = async (): Promise<ITask[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

// Fetch a single task by ID
export const getTask = async (id: string): Promise<ITask> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (task: NewTaskData): Promise<ITask> => {
  const response = await api.post('/tasks', task);
  return response.data;
};

// Update a task
export const updateTask = async (
  id: string,
  updates: UpdateTaskData
): Promise<ITask> => {
  const response = await api.patch(`/tasks/${id}`, updates);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const loginUser = async (
  userData: ILoginData
): Promise<IUserAuthResponse> => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

export const registerUser = async (
  userData: IRegisterData
): Promise<IUserAuthResponse> => {
  const response = await api.post('/users/register', userData);
  return response.data;
};