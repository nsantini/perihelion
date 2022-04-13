const profile = require("./profile");

module.exports = {
  getConnectedPeers: async (ssb) => {
    const connectedPeers = ssb.conn.query().peersConnected();
    const connectedPeersProfiles = await Promise.all(
      connectedPeers
        .filter(([addr, data]) => !["room", "pub"].includes(data.type))
        .map(async ([addr, data]) => await profile.getProfile(ssb, data.key))
    );
    return connectedPeersProfiles;
  },
  updateFollow: async (ssb, feedId, currentState) => {
    const state = !currentState;
    return new Promise((resolve, reject) => {
      ssb.friends.follow(feedId, { state }, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve({ following: state });
      });
    });
  },
};
