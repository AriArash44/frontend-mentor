export const useGet = <T>(endpoint: string) => {
  const baseURL = useRuntimeConfig().public.API_BASE_URL
  return useFetch<T>(`${baseURL}${endpoint}`)
}