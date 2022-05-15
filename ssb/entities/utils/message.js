const blob = require("../blob");
const votes = require("../votes");

module.exports = async (ssb, msg) => {
  let text = msg.value.content.text;
  if (msg.value.content.type === "blog") {
    const blog = await blob.getBlob(ssb, msg.value.content.blog);
    text = `# ${msg.value.content.title}\n\n> ${
      msg.value.content.summary
    }\n\n---\n${Buffer.from(blog || "", "base64").toString("utf-8")})`;
  }
  const voters = await votes.getVotes(ssb, msg.key);
  return {
    msgId: msg.key,
    author: msg.value.author,
    timestamp: msg.value.timestamp,
    text,
    recps: msg.value.content.recps,
    voters,
  };
};
