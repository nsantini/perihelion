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

const transform = messagess => {
  return messages.map(processMsg);
}

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

  getLatestPosts: async() => {
    console.log('getting latest posts')
    const ssb = await ssbClientPromise();
    const maxMessages = 5;

    const source = ssb.query.read(
      configure({
        query: [
          {
            $filter: {
              value: {
                timestamp: { $lte: Date.now() },
                content: {
                  type: { $in: ["post", "blog"] },
                },
              },
            },
          },
        ],
      })
    );

    return new Promise((resolve, reject) => {
      pull(
        source,
        pull.take(maxMessages),
        pull.collect((err, collectedMessages) => {
          if (err) {
            console.error('get latests', err)
            reject(err);
          } else {
            console.log(collectedMessages)
            resolve(transform(collectedMessages));
          }
        })
      );
    });
  },

  getPosts: async (cb) => {
    
    const client = await ssbClientPromise();
    let count = 0;
    return new Promise((resolve, reject) => {
      const messages = [];
      const collector = (msg) => {
        if (!msg.value || msg.value.content.type !== "post") return;
        messages.push(processMsg(msg));
        if (count === 20) resolve(messages);
        count++;
      };
      const drained = (err) => {
        if (err) {
          console.error("getPosts", err);
          return reject(err);
        }
        resolve(messages);
      };
      pull(
        client.createFeedStream({ live: false, reverse: true }),
        pull.drain(collector, drained)
      );
    });
  },
};
