const SecretStack = require("secret-stack");
const ssbConfig = require("ssb-config");
const caps = require("ssb-caps");

module.exports = () => {
  if (global._ssbServer) return global._ssbServer;
  console.log("Starting SSB server");
  process.on("uncaughtException", function (err) {
    console.error(err);
  });
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
    .use(require("ssb-room-client")) // needs: conn
    .use(require("ssb-http-auth-client")) // needs: conn
    .use(require("ssb-http-invite-client"))
    .use(require("ssb-invite-client")) // needs: db2, conn
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
    connections: {
      incoming: {
        tunnel: [{ scope: "public", transform: "shs" }],
      },
      outgoing: {
        net: [{ transform: "shs" }],
        tunnel: [{ transform: "shs" }],
      },
    },
  });
  return global._ssbServer;
};
