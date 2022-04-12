import useSWR from "swr";
import fetcher from "./utils/fetcher";

export default function useProfiles(name) {
  const { data, error } = useSWR(
    `/api/profiles/${encodeURIComponent(name)}`,
    fetcher
  );

  return {
    profiles: data,
    isLoading: !error && !data,
    isError: error,
  };
}
