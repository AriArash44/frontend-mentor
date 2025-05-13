import axios from 'axios';

export const getFetcher = async(url: string) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch(error: any) {
        throw error.response?.data || error.message;
    }
}