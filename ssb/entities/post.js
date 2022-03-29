module.exports = async (ssb, text) => {
  return new Promise(async (resolve, reject) => {
    try {
      ssb.db.publish(
        {
          timestamp: Date.now(),
          author: ssb.id,
          type: "post",
          text,
        },
        (err, kvt) => {
          if (err) {
            return reject(err);
          }
          resolve(kvt);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
