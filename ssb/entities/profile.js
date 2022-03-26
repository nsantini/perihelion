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

const getAboutField = async (ssb, key, feedId) => {
  const source = ssb.backlinks.read({
    reverse: true,
    query: [
      {
        $filter: {
          dest: feedId,
          value: {
            author: feedId,
            content: { type: "about", about: feedId },
          },
        },
      },
    ],
  });
  return new Promise((resolve, reject) =>
    pull(
      source,
      pull.find(
        (message) =>
          message &&
          message.value &&
          message.value.content &&
          message.value.content[key] !== undefined,
        (err, message) => {
          if (err) {
            reject(err);
          } else {
            if (message === null) {
              reject({ error: "null message" });
            } else {
              resolve(message.value.content[key]);
            }
          }
        }
      )
    )
  );
};

module.exports = async (ssb, feedId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let name, description, image;
      try {
        name = await getAboutField(ssb, "name", feedId);
      } catch(e) {
        console.log('Error getting name', e)
      }
      try {
        description = await getAboutField(ssb, "description", feedId);
      } catch(e) {
        console.log('Error getting description', e)
      }
      try {
        const imageRaw = await getAboutField(ssb, "image", feedId);
        const imageBuffer = await getBlob(ssb, imageRaw);
        image = imageBuffer.toString("base64");
      } catch(e) {
        console.log('Error getting image', e)
      }
      resolve({
        id: feedId,
        name: name || feedId.slice(1, 1 + 8),
        description: description || "",
        image: image || '',
      });
    } catch (err) {
      reject(err);
    }
  });
};
