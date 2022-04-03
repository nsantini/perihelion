const pull = require("pull-stream");
module.exports = (ssb, blobId) => {
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
};
