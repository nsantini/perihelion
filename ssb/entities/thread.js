const pull = require("pull-stream");

const processMsg = require("./utils/message");

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
