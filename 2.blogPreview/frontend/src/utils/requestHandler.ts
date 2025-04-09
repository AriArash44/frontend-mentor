import axios from 'axios';
import { errorMessages } from '../consts/errorMessages';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function apiGet(url: string, params = {}) {
    try {
        const response = await axiosInstance.get(url, params);
        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.message){
            throw new Error(error?.response?.data?.message);
        }
        throw new Error(errorMessages.networkError);
    }
}

export async function apiPost(url: string, data: object = {}) {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.message){
            throw new Error(error?.response?.data?.message);
        }
        throw new Error(errorMessages.networkError);
    }
};