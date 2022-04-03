const ssbFactory = require("./server");
const profile = require("./entities/profile");
const feed = require("./entities/feed");
const post = require("./entities/post");
const peers = require("./entities/peers");
const blob = require("./entities/blob");

module.exports = {
  getProfile: async (id) => {
    try {
      const ssb = ssbFactory();
      return profile.getProfile(ssb, id === "self" ? ssb.id : id);
    } catch (err) {
      console.error("getProfile", err);
      throw err;
    }
  },

  updateProfile: async (updates) => {
    try {
      const ssb = ssbFactory();
      return profile.updateProfile(ssb, updates);
    } catch (err) {
      console.error("getProfile", err);
      throw err;
    }
  },

  getThreads: async (hops) => {
    try {
      const ssb = ssbFactory();
      return feed(ssb, hops);
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

  getConnectedPeers: async () => {
    try {
      const ssb = ssbFactory();
      return peers(ssb);
    } catch (err) {
      console.error("getConnectedPeers", err);
      throw err;
    }
  },

  getBlob: async (blobId) => {
    try {
      const ssb = ssbFactory();
      return blob(ssb, blobId);
    } catch (err) {
      console.error("getBlob", err);
      throw err;
    }
  },
};
