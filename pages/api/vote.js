import ssbApi from "../../ssb/api";

export default async function handler(req, res) {
  try {
    const response = await ssbApi.vote(req.body.msgId);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
