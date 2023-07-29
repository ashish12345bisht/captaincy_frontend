import api from '../helpers/interceptor';

export const getAllUsers = async (payload) => await api.get('/home/getAllUsers', payload);
export const addUser = async () => await api.post('/newUser');
export const getAllSubadmin = async () => await api.get("/home/getAllSubadmin");
export const getUserDetails = async (payload) => await api.get(`/home/getUserDetails?user_id=${payload.user_id}`);
export const userDelete = async (payload) => await api.post(`/home/deleteUser`, payload);
