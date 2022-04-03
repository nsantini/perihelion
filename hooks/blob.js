import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function useBlob(blobId) {
  const { data, error } = useSWR(
    `/api/blob/${encodeURIComponent(blobId)}`,
    fetcher
  );

  return {
    blob: data,
    isLoading: !error && !data,
    isError: error,
  };
}
