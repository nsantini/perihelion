import nextConnect from "next-connect";
import middleware from "../../../middleware/multiparty";
import ssbApi from "../../../ssb/api";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const storedBlobLink = await ssbApi.uploadBlob(req.files.file[0]);
    res.status(200).json(storedBlobLink);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
