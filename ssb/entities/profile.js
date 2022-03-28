const pull = require("pull-stream");

const getBlob = (ssb, blobId) => {
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
          resolve(buffer);
        }
      })
    );
  });
};

const getProfile = async (ssb, feedId) => {
  return new Promise((resolve, reject) => {
    ssb.db.onDrain("aboutSelf", () => {
      try {
        const profile = ssb.db.getIndex("aboutSelf").getProfile(feedId);
        resolve(profile);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
};

module.exports = async (ssb, feedId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, description, image } = await getProfile(ssb, feedId);
      try {
        const imageBuffer = await getBlob(ssb, image);
        image = imageBuffer.toString("base64");
      } catch (e) {
        console.log("Error getting image", e);
      }
      resolve({
        id: feedId,
        name: name || feedId.slice(1, 1 + 8),
        description: description || "",
        image: image || "",
      });
    } catch (err) {
      reject(err);
    }
  });
};
