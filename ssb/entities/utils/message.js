const blob = require("../blob");
const votes = require("../votes");

module.exports = async (ssb, msg) => {
  let imageLinks = [];
  let blobs = [];
  const re = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/g;
  const matches = [...(msg.value.content.text || "").matchAll(re)];
  if (matches) {
    imageLinks = matches
      .filter((match) => match && match[2][0] === "&")
      .map((match) => {
        return {
          title: match[1],
          ref: match[2],
        };
      });
    blobs = await Promise.all(
      imageLinks.map(async (link) => {
        return {
          link: link.ref,
          blob: await blob.getBlob(ssb, link.ref),
          title: link.title,
          mimeType: link.title.substring(0, link.title.indexOf(":")),
        };
      })
    );
  }
  const voters = await votes.getVotes(ssb, msg.key);
  return {
    msgId: msg.key,
    author: msg.value.author,
    timestamp: msg.value.timestamp,
    text: msg.value.content.text,
    recps: msg.value.content.recps,
    blobs,
    voters,
  };
};
