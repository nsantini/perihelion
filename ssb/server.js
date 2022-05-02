const SecretStack = require("secret-stack");
const Config = require("ssb-config/inject");
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
    // Replication
    .use(require("ssb-ebt")) // needs: db2/compat
    .use(require("ssb-friends")) // needs: db2
    .use(require("ssb-replicate"))
    .use(require("ssb-replication-scheduler")) // needs: friends, ebt
    // Connections
    .use(require("ssb-conn"))
    .use(require("ssb-lan"))
    .use(require("ssb-room-client")) // needs: conn
    .use(require("ssb-http-auth-client")) // needs: conn
    .use(require("ssb-http-invite-client"))
    .use(require("ssb-invite-client")) // needs: db2, conn
    // Queries
    .use(require("ssb-threads")) // needs: db, db2, friends
    // .use(require('ssb-search2')) // needs: db2
    .use(require("ssb-blobs"));

  const ssbConfig = Config("ssb", {
    db2: {
      automigrate: true,
      dangerouslyKillFlumeWhenMigrated: true,
    },
    replicate: {
      legacy: true,
      fallback: true,
    },
    connections: {
      incoming: {
        net: [{ scope: "private", transform: "shs", port: 26831 }],
        channel: [{ scope: "device", transform: "noauth" }],
        bluetooth: [{ scope: "public", transform: "shs" }],
        tunnel: [{ scope: "public", transform: "shs" }],
      },
      outgoing: {
        net: [{ transform: "shs" }],
        ws: [{ transform: "shs" }],
        bluetooth: [{ scope: "public", transform: "shs" }],
        tunnel: [{ transform: "shs" }],
      },
    },
  });
  global._ssbServer = ssb(ssbConfig);

  // Connect to pubs
  const connectToPubs = () => {
    global._ssbServer.conn.dbPeers().forEach(([addr, data]) => {
      if (data.type === "pub" && data.autoconnect) {
        console.log(`Connecting to Pub ${data.name}: ${data.key}`);
        global._ssbServer.conn.connect(addr, (err, connData) => {
          if (err) console.error(err);
          else {
            console.log("Connected", connData.id);
          }
        });
      }
    });
  };

  setTimeout(connectToPubs, 5000);

  return global._ssbServer;
};
