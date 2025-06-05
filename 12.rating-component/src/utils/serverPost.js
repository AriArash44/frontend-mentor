export async function serverPost(url, headers = {}, body = {}) {
    const baseUrl = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_PROD_URL;
    const res = await fetch(baseUrl.concat(url), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        let errorMessage;
        try {
            const errorData = await res.json();
            errorMessage = errorData?.message ?? res.statusText;
        } catch (e) {
            errorMessage = res.statusText;
        }
        throw new Error(`Failed to fetch data. Status: ${res.status}, message: ${errorMessage}`);
    }

    return await res.json();
}