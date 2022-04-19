const blob = require("../blob");

module.exports = async (ssb, msg) => {
  let imageLinks = [];
  let blobs = [];
  const re = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/g;
  const matches = [...(msg.value.content.text || "").matchAll(re)];
  if (matches) {
    imageLinks = matches
      .filter((match) => match && match[2][0] === "&")
      .map((match) => match[2]);
    blobs = await Promise.all(
      imageLinks.map(async (link) => {
        const b = {
          link,
          blob: await blob.getBlob(ssb, link),
        };
        return b;
      })
    );
  }
  return {
    key: msg.key,
    author: msg.value.author,
    timestamp: msg.value.timestamp,
    text: msg.value.content.text,
    recps: msg.value.content.recps,
    blobs,
  };
};
