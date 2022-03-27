const pull = require("pull-stream");
const ssbClientPromise = require("./client");
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

  return pull.filter((message) => {
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
};

const isPost = () => {
  return pull.filter(
    (message) =>
      message &&
      message.value &&
      message.value.content &&
      (message.value.content.type === "post" ||
        message.value.content.type === "blog")
  );
};

module.exports = {
  getProfile: async (id) => {
    try {
      const client = await ssbClientPromise();
      return await profile(client, id === "self" ? client.id : id);
    } catch (err) {
      console.error("getProfile", err);
      throw err;
    }
  },

  getUsers: async () => {
    const client = await ssbClientPromise();
    return new Promise((resolve, reject) => {
      const users = [];
      const collector = (user) => {
        users.push(user);
        console.log(user);
      };
      const drained = (err) => {
        if (err) {
          console.error("getUsers", err);
          return reject(err);
        }
        resolve(users);
      };
      pull(client.createUserStream({}), pull.drain(collector, drained));
    });
  },

  getPosts: async (hops) => {
    const maxMessages = 50;
    const client = await ssbClientPromise();
    const followingFilter = await socialFilter(client, hops);
    return new Promise((resolve, reject) => {
      pull(
        client.createFeedStream({ live: false, reverse: true }),
        followingFilter,
        isPost(),
        pull.take(maxMessages),
        pull.collect((err, collectedMessages) => {
          if (err) {
            console.error("get latests posts", err);
            reject(err);
          } else {
            resolve(collectedMessages.map(processMsg));
          }
        })
      );
    });
  },
};
