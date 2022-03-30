import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useProfile(feedId) {
  const { data, error } = useSWR(
    `/api/profile/${feedId ? encodeURIComponent(feedId) : "self"}`,
    fetcher
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}
