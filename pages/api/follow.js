import ssbApi from "../../ssb/api";

export default async function handler(req, res) {
  try {
    const { feedId, currentState } = req.body;
    const response = await ssbApi.updateFollow(feedId, currentState);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
