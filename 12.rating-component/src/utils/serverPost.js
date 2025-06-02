export async function serverPost(url, headers = {}, body = {}) {
    const res = await fetch(url, {
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