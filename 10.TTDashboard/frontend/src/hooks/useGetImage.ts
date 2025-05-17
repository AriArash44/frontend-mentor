import { useState, useEffect } from "react";
import axios from "axios";

export function useGetImage(url: string) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BASE_URL.concat(url), {
                    responseType: "blob",
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImageSrc(imageUrl);
            } catch (error: any) {
                setError(error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchImage();
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [url]);

    return { imageSrc, error, loading };
}