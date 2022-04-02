const profile = require("./profile");

module.exports = async (ssb) => {
  const connectedPeers = ssb.conn.query().peersConnected();
  const connectedPeersProfiles = await Promise.all(
    connectedPeers.map(
      async ([addr, data]) => await profile.getProfile(ssb, data.key)
    )
  );
  return connectedPeersProfiles;
};
