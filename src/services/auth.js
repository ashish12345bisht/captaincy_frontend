import api from '../helpers/interceptor';

export const signin = async (payload) => await api.post(`/sign-in`, payload);
export const signup = async (payload) => await api.post(`/sign-up`, payload);
export const addNewUser = async (payload) => await api.post(`/home/add-user`, payload);
export const addNewTeam = async (payload) => await api.post(`/home/add-team`, payload);
export const addSubadmin = async (payload) => await api.post(`/addSubadmin`, payload);
export const changePassword = async (payload) => await api.post(`/changePassword`, payload);


