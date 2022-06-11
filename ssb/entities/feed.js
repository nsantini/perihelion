const pull = require("pull-stream");
const processMsg = require("./utils/message");
const socialGraph = require("./utils/socialGraph");

/**
 * Returns a function that filters messages based on who published the message.
 */
const socialFilter = async (ssb, hops) => {
  const { id } = ssb;
  const graph = await socialGraph.getSocialGraph(ssb);
  const relationshipObject = graph[id];

  const followingList = Object.entries(relationshipObject)
    .filter(([, val]) => val >= socialGraph.weightings.following)
    .map(([key]) => key);

  const blockingList = Object.entries(relationshipObject)
    .filter(([, val]) => val === socialGraph.weightings.blocking)
    .map(([key]) => key);

  return pull.filter((thread) => {
    if (blockingList.includes(thread.root.value.author)) {
      return false;
    }
    if (hops <= 1 && thread.root.value.author === id) {
      return true;
    } else if (hops <= 1) {
      return followingList.includes(thread.root.value.author);
    } else if (hops > 1 && thread.root.value.author !== id) {
      return !followingList.includes(thread.root.value.author);
    }
  });
};

const collector = (ssb, resolve, reject) => {
  return async (err, collectedThreads) => {
    if (err) {
      console.error("get latests posts", err);
      reject(err);
    } else {
      resolve(
        await Promise.all(
          collectedThreads.map(async (thread) => {
            const root = await processMsg(ssb, thread.root);

            return {
              messages: [root],
              replyCount: thread.replyCount,
            };
          })
        )
      );
    }
  };
};

module.exports = {
  getProfileFeed: async (ssb, feedId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const maxMessages = 20;
        pull(
          ssb.threads.profileSummary({
            id: feedId,
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
  getPublicFeed: async (ssb, hops) => {
    return new Promise(async (resolve, reject) => {
      try {
        const maxMessages = 20;
        const socialFilterInstance = await socialFilter(ssb, hops);
        pull(
          ssb.threads.publicSummary({ allowlist: ["post", "blog"] }),
          socialFilterInstance,
          pull.take(maxMessages),
          pull.collect(collector(ssb, resolve, reject))
        );
      } catch (err) {
        reject(err);
      }
    });
  },
};
