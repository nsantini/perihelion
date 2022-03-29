import ssbApi from "../../ssb/api";

export default async function handler(req, res) {
  try {
    const { message } = req.body;
    const response = await ssbApi.postMessage(message);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
