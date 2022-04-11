import ssbApi from "../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { hops } = req.query;
    const threads = isNaN(hops)
      ? await ssbApi.getProfileThreads(hops)
      : await ssbApi.getThreads(parseInt(hops));
    return res.status(200).json(threads);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
