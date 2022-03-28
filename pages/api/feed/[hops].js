import ssbApi from "../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { hops } = req.query;
    const threads = await ssbApi.getThreads(parseInt(hops));
    return res.status(200).json(threads);
  } catch (e) {
    console.error("Feed API", e);
    res.status(500).json({ error: e });
  }
}
