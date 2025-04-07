import axios from 'axios';

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
    } catch (error) {
        throw error;
    }
}

export async function apiPost(url: string, data: object = {}) {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};