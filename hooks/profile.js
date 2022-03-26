import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useProfile(id) {
  const { data, error } = useSWR(
    `/api/profile/${id ? encodeURIComponent(id) : "self"}`,
    fetcher
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}
