const ssbFactory = require("./server");
const profile = require("./entities/profile");
const feed = require("./entities/feed");
const post = require("./entities/post");

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
    try {
      const ssb = ssbFactory();
      return await feed(ssb, hops);
    } catch (err) {
      console.error("getThreads", err);
      throw err;
    }
  },

  postMessage: async (message) => {
    try {
      const ssb = ssbFactory();
      return await post(ssb, message);
    } catch (err) {
      console.error("postMessage", err);
      throw err;
    }
  },
};
