import { useRouter } from "next/router";
import Feed from "../../components/organisms/feed";

export default function FeedPage() {
  const router = useRouter();
  const { hops } = router.query;
  return <Feed hops={hops} />;
}
