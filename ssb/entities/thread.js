const pull = require("pull-stream");

const processMsg = require("./utils/message");

const loadThread = async (ssb, msgId, isPrivate) => {
  return new Promise(async (resolve, reject) => {
    try {
      pull(
        ssb.threads.thread({
          root: msgId,
          allowlist: ["post", "blog"],
          private: isPrivate,
        }),
        pull.drain(async (thread) => {
          const messages = await Promise.all(
            (thread.messages || []).map(async (message) => {
              const processed = await processMsg(ssb, message);
              if (msgId !== processed.msgId) {
                const replies = await loadThread(
                  ssb,
                  processed.msgId,
                  isPrivate
                );
                processed.replies = replies.messages.length - 1;
              }
              return processed;
            })
          );

          resolve({
            messages,
          });
        })
      );
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

module.exports = async (ssb, msgId, isPrivate) => {
  return loadThread(ssb, msgId, isPrivate);
};
