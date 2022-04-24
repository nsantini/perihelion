import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function useFeed(hops) {
  const { data, error, mutate } = useSWR(`/api/feed/${hops}`, fetcher);

  return {
    feed: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
