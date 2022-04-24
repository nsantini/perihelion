import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function useProfile(feedId) {
  const { data, error, mutate } = useSWR(
    `/api/profile/${feedId ? encodeURIComponent(feedId) : "self"}`,
    fetcher
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
