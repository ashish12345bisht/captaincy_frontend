import api from '../helpers/interceptor';


export const addTask = async (payload) => await api.post("/home/addTask", payload);
export const getAllTasks = async () => await api.get("/home/getAllTasks");
export const updateTaskStatus = async (payload) => await api.post(`/home/updateTaskStatus`, payload);