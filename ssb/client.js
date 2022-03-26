const ssbClient = require("ssb-client");
const ssbServerFactory = require("./server");

const connect = () => {
  console.log("Creating SSB client");
  return new Promise((resolve, reject) => {
    ssbClient((err, sbot) => {
      if (err) {
        return reject(err);
      }
      // ready
      console.log("SSB client created");
      resolve(sbot);
    });
  });
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    try {
      if (global.clientHandle && global.clientHandle.closed === false) {
        resolve(global.clientHandle);
      } else {
        ssbServerFactory();
        setTimeout(() => {
          connect()
            .then((client) => {
              global.clientHandle = client;
              resolve(client);
            })
            .catch((e) => {
              console.error('getClient', e);
              reject(e);
            });
        }, 1000);
      }
    } catch(err) {
      console.error('getClient', err)
    }
  });
};
