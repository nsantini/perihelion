const pull = require("pull-stream");
const processMsg = require("./utils/message");

const collector = (ssb, resolve, reject) => {
  return async (err, collectedThreads) => {
    if (err) {
      console.error("get latests posts", err);
      reject(err);
    } else {
      resolve(
        await Promise.all(
          collectedThreads.map(async (thread) => {
            thread.messages = thread.messages || [];
            const replyCount = thread.messages.length - 1;
            thread.messages.slice(0, 1);
            const messages = await Promise.all(
              thread.messages.map(async (message) => {
                const processed = await processMsg(ssb, message);
                return processed;
              })
            );

            return {
              messages,
              replyCount,
            };
          })
        )
      );
    }
  };
};

module.exports = {
  getPrivateFeed: async (ssb) => {
    return new Promise(async (resolve, reject) => {
      try {
        const maxMessages = 20;
        pull(
          ssb.threads.private({
            allowlist: ["post", "blog"],
          }),
          pull.take(maxMessages),
          pull.collect(collector(ssb, resolve, reject))
        );
      } catch (err) {
        reject(err);
      }
    });
  },
};
