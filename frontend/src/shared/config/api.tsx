import axiosInstance from "./axiosinstance";

export const loginApi = (data: { username: string; password: string }) => {
    return axiosInstance.post('/auth/login', data);
};

export const registerApi = (data: { email: string; username: string; password: string }) => {
    return axiosInstance.post('/auth/register', data);
};

export const getUserListApi = () => {
    return axiosInstance.get('/user/list');
};

export const userSearchApi = (searchTerm: string) => {
    return axiosInstance.get(`auth/search?q=${searchTerm}`);
};