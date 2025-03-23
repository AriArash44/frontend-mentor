import axios from 'axios';
import { CustomAxiosRequestConfig } from '../types/customRequestConfig';
import { ApiError } from '../types/apiError';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config: CustomAxiosRequestConfig) => {
        const needToken = config.needToken || false;
        if (needToken) {
            const accessToken = localStorage.getItem('access-token');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 500 &&
            error.response.data.message === 'Invalid or expired token' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh-token');
                if (!refreshToken) {
                    throw new Error('Refresh token not found');
                }
                const { data } = await axiosInstance.get('/api/authentication/refresh-token', {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });
                const newAccessToken = data.accessToken;
                localStorage.setItem('access-token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                const error = refreshError as ApiError;
                if (
                    error.response &&
                    error.response.status === 500 &&
                    error.response.data.message ===
                        'Invalid or expired token'
                ) {
                    console.error(
                        'Refresh token invalid or expired. Logging out user.'
                    );
                    localStorage.removeItem('access-token');
                    localStorage.removeItem('refresh-token');
                    throw new Error('Session expired. Please log in again.');
                }
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);

export async function apiGet(url: string, params = {}, needToken = false) {
    try {
        const config: any = { params };
        if (needToken) {
            config.needToken = needToken;
        }
        const response = await axiosInstance.get(url, config);
        return response.data;
    } catch (error) {
        console.error(`GET ${url} failed:`, error);
        throw error;
    }
}

export async function apiPost(url: string, data: object = {}, needToken = false) {
    try {
        const config: any = {};
        if (needToken) {
            config.needToken = needToken;
        }
        const response = await axiosInstance.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error(`POST ${url} failed:`, error);
        throw error;
    }
};