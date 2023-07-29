import api from '../helpers/interceptor';

export const addTeam = async (payload) => await api.post('/home/addTeam', payload);
export const editTeam = async (payload) => await api.post('/home/editTeam', payload);
export const deleteTeam = async (payload) => await api.post('/home/deleteTeam', payload);
export const getTeamDetails = async (payload) => await api.post('/home/getTeamDetails', payload);
export const addTeamMembers = async (payload) => await api.post(`/home/addTeamMembers`, payload);
export const removeTeamMember = async (payload) => await api.post(`/home/deleteTeamMember`, payload);
