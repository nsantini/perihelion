const pull = require("pull-stream");
const ssbClientPromise = require("./client");
const profile = require("./entities/profile");

const processMsg = (msg) => {
  // pull variables out of the message
  if (!msg.value) return "";
  const author = msg.value.author;
  const type = msg.value.content.type;
  if (type !== "post") return "";
  const text = msg.value.content.text;
  const timestamp = msg.value.timestamp;
  return `
        ${new Date(timestamp)}
        ${author} said
        ${text}
    `;
};

module.exports = {
  getOwnProfile: async () => {
    const client = await ssbClientPromise();
    const feedId = client.id;
    return await profile(client, feedId);
  },

  getProfile: async (feedId) => {
    const client = await ssbClientPromise();
    return await profile(client, feedId);
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
          console.error(err);
          return reject(err);
        }
        resolve(users);
      };
      pull(client.createUserStream({}), pull.drain(collector, drained));
    });
  },

  getMessages: async (cb) => {
    const client = await ssbClientPromise();
    let count = 0;
    return new Promise((resolve, reject) => {
      const messages = [];
      const collector = (msg) => {
        if (!msg.value || msg.value.content.type !== "post") return;
        messages.push(processMsg(msg));
        if (count === 100) resolve(messages);
        count++;
      };
      const drained = (err) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(messages);
      };
      pull(
        client.createLogStream({ live: false }),
        pull.drain(collector, drained)
      );
    });
  },
};
