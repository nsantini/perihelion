const pull = require("pull-stream");

const getBlob = (ssb, blobId) => {
  const bufferSource = ssb.blobs.get(blobId);
  return new Promise((resolve) => {
    pull(
      bufferSource,
      pull.collect(async (err, bufferArray) => {
        if (err) {
          await models.blob.want({ blobId });
          resolve(Buffer.alloc(0));
        } else {
          const buffer = Buffer.concat(bufferArray);
          resolve(buffer);
        }
      })
    );
  });
};

module.exports = async (ssb, feedId) => {
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
        (message) => message.value.content !== undefined,
        async (err, message) => {
          if (err) {
            reject(err);
          } else {
            if (message === null) {
              resolve(null);
            } else {
              const image64 = await getBlob(ssb, message.value.content.image);
              resolve({
                id: message.value.content.about,
                name: message.value.content.name || feedId.slice(1, 1 + 8),
                description: message.value.content.description || "",
                image: image64.toString("base64"),
              });
            }
          }
        }
      )
    )
  );
};
