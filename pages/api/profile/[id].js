import ssbApi from "../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (req.body) {
      // update profile
      await ssbApi.updateProfile(req.body);
    }
    const profile = await ssbApi.getProfile(decodeURIComponent(id));
    return res.status(200).json(profile);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
