import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function usePeers() {
  const { data, error } = useSWR("/api/peers", fetcher);

  return {
    peers: data,
    isLoading: !error && !data,
    isError: error,
  };
}
