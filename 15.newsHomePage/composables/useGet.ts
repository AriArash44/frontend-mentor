export const useGet = async <T>(endpoint: string) => {
  const baseURL = useRuntimeConfig().public.API_BASE_URL
  const { data, error, pending } = await useFetch<T>(`${baseURL}${endpoint}`)
  return { data, error, pending }
}
