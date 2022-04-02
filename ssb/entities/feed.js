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
          blob: await blob(ssb, link),
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

module.exports = async (ssb, hops) => {
  return new Promise(async (resolve, reject) => {
    try {
      const maxMessages = 20;
      const socialFilterInstance = await socialFilter(ssb, hops);
      pull(
        hops === 0
          ? ssb.threads.profile({ id: ssb.id, allowlist: ["post", "blog"] })
          : ssb.threads.public({ allowlist: ["post", "blog"] }),
        socialFilterInstance,
        pull.take(maxMessages),
        pull.collect(async (err, collectedThreads) => {
          if (err) {
            console.error("get latests posts", err);
            reject(err);
          } else {
            resolve(
              await Promise.all(
                collectedThreads.map(async (thread) => {
                  const messages = await Promise.all(
                    (thread.messages || []).map(async (message) => {
                      const processed = await processMsg(ssb, message);
                      return processed;
                    })
                  );

                  return {
                    messages,
                  };
                })
              )
            );
          }
        })
      );
    } catch (err) {
      reject(err);
    }
  });
};
