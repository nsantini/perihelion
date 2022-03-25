import ssbApi from "../../ssb/api";

export default async function handler(req, res) {
  try {
    const posts = await ssbApi.getPosts();
    return res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
