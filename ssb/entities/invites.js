const multiserver = require("multiserver-address");
const Ref = require("ssb-ref");

module.exports = async (ssb, invite) => {
  return new Promise((resolve, reject) => {
    if (multiserver.check(invite)) {
      ssb.conn.connect(invite, { type: "room" }, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const key = Ref.getKeyFromAddress(invite);
          ssb.conn.remember(invite, { key, type: "room", autoconnect: true });
          resolve(data);
        }
      });
    } else {
      ssb.invite.accept(invite, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    }
  });
};
