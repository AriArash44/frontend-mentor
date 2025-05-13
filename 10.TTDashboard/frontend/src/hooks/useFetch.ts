import { useState, useEffect } from "react";
import axios from "axios";

export function useGetFetch(url: string) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch(error: any) {
                setError(error.response?.data || error.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return {data, error, loading};
}