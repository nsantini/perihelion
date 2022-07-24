import ssbApi from "../../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { hops, page } = req.query;
    const threads = isNaN(hops)
      ? await ssbApi.getProfileThreads(hops, parseInt(page))
      : await ssbApi.getThreads(parseInt(hops), parseInt(page));
    return res.status(200).json(threads);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
