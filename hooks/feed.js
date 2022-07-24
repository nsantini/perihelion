import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function useFeed(hops, page = 1) {
  const { data, error, mutate } = useSWR(`/api/feed/${hops}/${page}`, fetcher);

  return {
    feed: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
