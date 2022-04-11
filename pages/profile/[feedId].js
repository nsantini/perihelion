import { useRouter } from "next/router";
import Profile from "../../components/organisms/profile";
import useProfile from "../../hooks/profile";

export default function ProfilePage() {
  const router = useRouter();
  const { feedId } = router.query;
  const { profile, isLoading, isError } = useProfile(feedId);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return <Profile profile={profile} />;
}
