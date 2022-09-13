const blob = require("../blob");
const votes = require("../votes");
const profile = require("../profile");

module.exports = async (ssb, msg) => {
  let text = msg.value.content.text;
  if (msg.value.content.type === "blog") {
    const blog = await blob.getBlob(ssb, msg.value.content.blog);
    text = `# ${msg.value.content.title}\n\n> ${
      msg.value.content.summary
    }\n\n---\n${Buffer.from(blog || "", "base64").toString("utf-8")})`;
  } else if (msg.value.content.type === "contact") {
    const userProfile = await profile.getRawProfile(ssb, msg.value.content.contact);
    if (msg.value.content.hasOwnProperty("following")) text = msg.value.content.following ? "Followed " : "Unfollowed ";
    else text = msg.value.content.blocking ? "Blocked " : "Unblocked "
    text += `@[${
      userProfile.name || msg.value.content.contact.slice(1, 1 + 8)
    }](${msg.value.content.contact})`;
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
