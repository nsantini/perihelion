import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function usePrivate() {
  const { data, error } = useSWR(`/api/private`, fetcher);

  return {
    threads: data,
    isLoading: !error && !data,
    isError: error,
  };
}
