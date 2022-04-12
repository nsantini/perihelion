import ssbApi from "../../../ssb/api";

export default async function handler(req, res) {
  try {
    const response = await ssbApi.filterProfiles(req.query.name);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
