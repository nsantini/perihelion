import ssbApi from "../../../ssb/api";

export default async function handler(req, res) {
  try {
    const { blobId } = req.query;
    const image = await ssbApi.getBlob(decodeURIComponent(blobId));
    return res
      .status(200)
      .send(`data:image/png;base64,${Buffer.from(image || "")}`);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
