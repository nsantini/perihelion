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
  let text = msg.value.content.text;
  if (msg.value.content.type === "blog") {
    const blog = await blob.getBlob(ssb, msg.value.content.blog);
    text = `# ${msg.value.content.title}\n\n> ${
      msg.value.content.summary
    }\n\n---\n${Buffer.from(blog || "", "base64").toString("ascii")})`;
  }
  const voters = await votes.getVotes(ssb, msg.key);
  return {
    msgId: msg.key,
    author: msg.value.author,
    timestamp: msg.value.timestamp,
    text,
    recps: msg.value.content.recps,
    blobs,
    voters,
  };
};
