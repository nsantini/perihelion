import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function useThread(msgId) {
  const { data, error, mutate } = useSWR(
    `/api/thread/${encodeURIComponent(msgId)}`,
    fetcher
  );

  return {
    thread: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
