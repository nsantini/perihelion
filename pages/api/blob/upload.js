import fs from "fs";
import middleware from "../../../middleware/multiparty";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  // console.log(req.files);
  // {
  //   file: [
  //     {
  //       fieldName: 'file',
  //       originalFilename: 'pippa drawing 6.jpeg',
  //       path: '/var/folders/hb/m_6pj0ws2z53fz15sfswqw300000gp/T/ab24fMReeUlYcd_b3H7dzNvD.jpeg',
  //       headers: [Object],
  //       size: 155060
  //     }
  //   ]
  // }
  const blobContent = fs.readFileSync(req.files.file[0].path, {
    encoding: "base64",
  });
  res.status(200).json({
    blobName: req.files.file[0].originalFilename,
    blobId: req.files.file[0].originalFilename,
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
