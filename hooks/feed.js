import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFeed(hops) {
  const { data, error } = useSWR(`/api/feed/${hops}`, fetcher);

  return {
    feed: data,
    isLoading: !error && !data,
    isError: error,
  };
}
