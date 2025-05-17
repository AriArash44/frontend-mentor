import axios from 'axios';
import useSWR from 'swr';

const axiosFetch = async (url: string) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export function useFetcher(endpoint: string) {
    const finalUrl = import.meta.env.VITE_BASE_URL.concat(endpoint);
    return useSWR(finalUrl, axiosFetch, {
        refreshInterval: 10000,
    });
}