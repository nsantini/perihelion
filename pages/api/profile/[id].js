import ssbApi from "../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const profile = await ssbApi.getProfile(id);
    return res.status(200).json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
}
