module.exports = async (ssb, invite) => {
  return new Promise((resolve, reject) => {
    ssb.invite.accept(invite, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
