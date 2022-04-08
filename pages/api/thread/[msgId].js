import ssbApi from "../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { msgId } = req.query;
    const thread = await ssbApi.getThread(msgId);
    return res.status(200).json(thread);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
