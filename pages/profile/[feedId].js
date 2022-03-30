import { useRouter } from "next/router";
import Profile from "../../components/profile";
import ProfileForm from "../../components/profileForm";
import useProfile from "../../hooks/profile";

export default function ProfilePage() {
  const router = useRouter();
  const { feedId } = router.query;
  const { profile, isLoading, isError } = useProfile(feedId);

  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return feedId === "self" ? (
    <ProfileForm profile={profile} />
  ) : (
    <Profile profile={profile} />
  );
}
