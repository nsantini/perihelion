const ssbFactory = require("./server");
const profile = require("./entities/profile");
const feed = require("./entities/feed");
const post = require("./entities/post");
const peers = require("./entities/peers");
const blob = require("./entities/blob");
const thread = require("./entities/thread");
const invites = require("./entities/invites");
const privateThreads = require("./entities/private");
const votes = require("./entities/votes");

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

  filterProfiles: async (name) => {
    try {
      const ssb = ssbFactory();
      return profile.filterProfiles(ssb, name);
    } catch (err) {
      console.error("filterProfiles", err);
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
      return feed.getPublicFeed(ssb, hops);
    } catch (err) {
      console.error("getThreads", err);
      throw err;
    }
  },

  getProfileThreads: async (feedId) => {
    try {
      const ssb = ssbFactory();
      return feed.getProfileFeed(ssb, feedId);
    } catch (err) {
      console.error("getProfileThreads", err);
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
      return peers.getConnectedPeers(ssb);
    } catch (err) {
      console.error("getConnectedPeers", err);
      throw err;
    }
  },

  getBlob: async (blobId) => {
    try {
      const ssb = ssbFactory();
      return blob.getBlob(ssb, blobId);
    } catch (err) {
      console.error("getBlob", err);
      throw err;
    }
  },

  uploadBlob: async (file) => {
    try {
      const ssb = ssbFactory();
      return blob.uploadBlob(ssb, file);
    } catch (err) {
      console.error("uploadBlob", err);
      throw err;
    }
  },

  getThread: async (msgId, isPrivate) => {
    try {
      const ssb = ssbFactory();
      return thread(ssb, msgId, isPrivate);
    } catch (err) {
      console.error("getThread", err);
      throw err;
    }
  },

  updateFollow: async (feedId, currentState) => {
    try {
      const ssb = ssbFactory();
      return peers.updateFollow(ssb, feedId, currentState);
    } catch (err) {
      console.error("updateFollow", err);
      throw err;
    }
  },

  claimInvite: async (invite) => {
    try {
      const ssb = ssbFactory();
      return invites(ssb, invite);
    } catch (err) {
      console.error("claimInvite", err);
      throw err;
    }
  },

  getPrivateFeed: async () => {
    try {
      const ssb = ssbFactory();
      return privateThreads.getPrivateFeed(ssb);
    } catch (err) {
      console.error("getPrivateFeed", err);
      throw err;
    }
  },

  vote: async (msgId) => {
    try {
      const ssb = ssbFactory();
      return votes.vote(ssb, msgId);
    } catch (err) {
      console.error("vote", err);
      throw err;
    }
  },
};
