const mime = require("mime");
const pull = require("pull-stream");
const Read = require("pull-file");

module.exports = {
  getBlob: (ssb, blobId) => {
    const bufferSource = ssb.blobs.get(blobId);
    return new Promise((resolve) => {
      pull(
        bufferSource,
        pull.collect(async (err, bufferArray) => {
          if (err) {
            await ssb.blobs.want(blobId);
            resolve(Buffer.alloc(0));
          } else {
            const buffer = Buffer.concat(bufferArray);
            resolve(buffer.toString("base64"));
          }
        })
      );
    });
  },
  uploadBlob: (ssb, file) => {
    //    {
    //       fieldName: 'file',
    //       originalFilename: 'pippa drawing 6.jpeg',
    //       path: '/var/folders/hb/m_6pj0ws2z53fz15sfswqw300000gp/T/ab24fMReeUlYcd_b3H7dzNvD.jpeg',
    //       headers: [Object],
    //       size: 155060
    //     }
    return new Promise(async (resolve, reject) => {
      try {
        const hash = await new Promise((resolve, reject) => {
          pull(
            Read(file.path, {}),
            ssb.blobs.add((err, hash) => {
              if (err) return reject(err);
              resolve(hash);
            })
          );
        });
        const mimeType = mime.getType(file.path);
        let link = "";
        if (mimeType.startsWith("image/")) {
          link = `\n![${file.originalFilename}](${hash})`;
        } else if (mimeType.startsWith("audio/")) {
          link = `\n![audio:${file.originalFilename}](${hash})`;
        } else if (mimeType.startsWith("video/")) {
          link = `\n![video:${file.originalFilename}](${hash})`;
        } else {
          link = `\n[${file.originalFilename}](${hash})`;
        }
        resolve({ link, hash });
      } catch (err) {
        reject(err);
      }
    });
  },
};
