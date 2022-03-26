const SecretStack = require("secret-stack");
const ssbConfig = require("ssb-config");

module.exports = () => {
  if (!global._ssbServer) {
    console.log("Starting SSB server");
    const ssb = SecretStack()
      // Core
      .use(require("ssb-master"))
      .use(require("ssb-db"))
      // Replication
      .use(require("ssb-ebt")) // needs: db2/compat
      .use(require("ssb-friends")) // needs: db2
      .use(require("ssb-replicate"))
      .use(require("ssb-replication-scheduler")) // needs: friends, ebt
      .use(require("ssb-backlinks"))
      // Connections
      .use(require("ssb-conn"))
      .use(require("ssb-lan"))
      .use(require("ssb-blobs"));
    global._ssbServer = ssb(ssbConfig);
  }
  return global._ssbServer;
};
