import ssbApi from "../../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { hops, page } = req.query;
    let paginationParameter = !isNaN(page) ? parseInt(page) : 1;
    if (paginationParameter < 1) paginationParameter = 1;
    const threads = isNaN(hops)
      ? await ssbApi.getProfileThreads(hops, paginationParameter)
      : await ssbApi.getThreads(parseInt(hops), paginationParameter);
    return res.status(200).json(threads);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
