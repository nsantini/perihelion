const pull = require("pull-stream");
const blob = require("./blob");

const processMsg = async (ssb, msg) => {
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
    blobs,
  };
};

module.exports = async (ssb, msgId) => {
  return new Promise(async (resolve, reject) => {
    try {
      pull(
        ssb.threads.thread({ root: msgId, allowlist: ["post", "blog"] }),
        pull.drain(async (thread) => {
          const messages = await Promise.all(
            (thread.messages || []).map(async (message) => {
              const processed = await processMsg(ssb, message);
              return processed;
            })
          );

          resolve({
            messages,
          });
        })
      );
    } catch (err) {
      reject(err);
    }
  });
};
