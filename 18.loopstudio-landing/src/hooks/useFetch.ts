'use client'

import axios from "axios";
import type { ResponseType } from "axios";
import { useState, useEffect } from "react";

const useFetch = <T,>(api_url: string, responseType?: ResponseType) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_API_BASE_URL! + api_url,
                    responseType ? { responseType } : {}
                );
                setData(response.data);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Unknown error";
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [api_url, responseType]);
    return { data, loading, error };
};

export default useFetch;