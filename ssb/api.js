const pull = require("pull-stream");
const ssbClientPromise = require("./client");
const profile = require("./entities/profile");

module.exports = {

  getProfile: async (id) => {
    const client = await ssbClientPromise();
    return await profile(client, id==='self' ? client.id : id);
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

  getPosts: async (cb) => {
    const processMsg = (msg) => {
      return {
        author: msg.value.author,
        timestamp: msg.value.timestamp,
        text: msg.value.content.text
      };
    };
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
