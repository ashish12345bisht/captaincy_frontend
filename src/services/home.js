import api from '../helpers/interceptor';

export const getAllTeams = async (payload) => await api.get(`/home/getAllTeams?skip=${payload.skip}&limit=${payload.limit}&search=${payload.search}`, payload);
export const getUsers = async (payload) => await api.get(`/home/getUsers?skip=${payload.skip}&limit=${payload.limit}&search=${payload.search}`, payload);
export const getTeamMembers = async (payload) => await api.get(`/home/getTeamMembers?id=${payload.id}&skip=${payload.skip}&limit=${payload.limit}&search=${payload.search}`)
