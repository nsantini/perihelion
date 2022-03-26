import ssbApi from "../../ssb/api";

export default async function handler(req, res) {
  try {
    const posts = await ssbApi.getPosts();
    return res.status(200).json(posts.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      } else if (a.timestamp > b.timestamp) {
        return -1
      } else {
        return 0
      }
    }));
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
