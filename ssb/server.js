const SecretStack = require("secret-stack");
const ssbConfig = require("ssb-config");
const caps = require("ssb-caps");

module.exports = () => {
  if (global._ssbServer) return global._ssbServer;
  console.log("Starting SSB server");
  const ssb = SecretStack({ caps })
    // Core
    .use(require("ssb-master"))
    .use(require("ssb-db2"))
    .use(require("ssb-db2/compat"))
    .use(require("ssb-db2/about-self")) // include index
    // // Replication
    .use(require("ssb-ebt")) // needs: db2/compat
    .use(require("ssb-friends")) // needs: db2
    .use(require("ssb-replicate"))
    .use(require("ssb-replication-scheduler")) // needs: friends, ebt
    // // Connections
    .use(require("ssb-conn"))
    .use(require("ssb-lan"))
    .use(require("ssb-invite-client"))
    // // Queries
    .use(require("ssb-threads")) // needs: db, db2, friends
    // .use(require('ssb-search2')) // needs: db2
    .use(require("ssb-blobs"));

  // global._ssbServer = ssb(ssbConfig);
  global._ssbServer = ssb({
    ...ssbConfig,
    db2: {
      automigrate: true,
      dangerouslyKillFlumeWhenMigrated: true,
    },
    replicate: {
      legacy: true,
      fallback: false,
    },
  });
  return global._ssbServer;
};
