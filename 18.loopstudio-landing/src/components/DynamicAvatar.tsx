'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function DynamicAvatar() {
    const { data, loading, error } = useFetch<Blob>("/dynamic-avatar", "blob");
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        if (data) {
            const objectUrl = URL.createObjectURL(data);
            Promise.resolve().then(() => {
                setUrl(objectUrl);
            });
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [data]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!url) return null;
    return (
      <Image src={url} alt="avatar" width={100} height={100} />
    );
}
