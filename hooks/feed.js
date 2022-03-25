import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFeed () {
    const { data, error } = useSWR(`/api/feed`, fetcher)
  
    return {
      feed: data,
      isLoading: !error && !data,
      isError: error
    }
}