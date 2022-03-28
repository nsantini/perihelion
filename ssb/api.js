const pull = require("pull-stream");
const { type, descending } = require("ssb-db2/operators");
const ssbFactory = require("./server");
const profile = require("./entities/profile");

const processMsg = (msg) => {
  return {
    author: msg.value.author,
    timestamp: msg.value.timestamp,
    text: msg.value.content.text,
  };
};

/**
 * Returns a function that filters messages based on who published the message.
 */
const socialFilter = async (ssb, hops) => {
  const { id } = ssb;
  const relationshipObject = await new Promise((resolve, reject) => {
    ssb.friends.graph((err, graph) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(graph[id] || {});
    });
  });

  const followingList = Object.entries(relationshipObject)
    .filter(([, val]) => val >= 0)
    .map(([key]) => key);

  const blockingList = Object.entries(relationshipObject)
    .filter(([, val]) => val === -1)
    .map(([key]) => key);

  return pull.filter((thread) => {
    return thread.messages.some((message) => {
      if (blockingList.includes(message.value.author)) {
        return false;
      }
      if (message.value.author === id) {
        return true;
      } else if (hops === 1) {
        return followingList.includes(message.value.author);
      } else if (hops > 1) {
        return true;
      }
    });
  });
};

module.exports = {
  getProfile: async (id) => {
    try {
      const ssb = ssbFactory();
      return await profile(ssb, id === "self" ? ssb.id : id);
    } catch (err) {
      console.error("getProfile", err);
      throw err;
    }
  },

  getThreads: async (hops) => {
    const ssb = ssbFactory();
    const maxMessages = 20;
    const socialFilterInstance = await socialFilter(ssb, hops);
    return new Promise((resolve, reject) => {
      pull(
        ssb.threads.public({ allowlist: ["post", "blog"] }),
        socialFilterInstance,
        pull.take(maxMessages),
        pull.collect((err, collectedThreads) => {
          if (err) {
            console.error("get latests posts", err);
            reject(err);
          } else {
            resolve(
              collectedThreads.map((thread) => {
                return {
                  messages: thread.messages.map(processMsg),
                };
              })
            );
          }
        })
      );
    });
  },
};
