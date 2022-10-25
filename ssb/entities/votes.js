const pull = require("pull-stream");
const ref = require("ssb-ref");
const { where, votesFor, toPullStream } = require("ssb-db2/operators");

module.exports = {
  getVotes: async (ssb, msgId) => {
    const rawVotes = await new Promise((resolve, reject) => {
      pull(
        ssb.db.query(where(votesFor(msgId)), toPullStream()),
        pull.filter(
          (ref) =>
            ref.value.content.type === "vote" &&
            ref.value.content.vote &&
            typeof ref.value.content.vote.value === "number" &&
            ref.value.content.vote.value >= 0 &&
            ref.value.content.vote.link === msgId
        ),
        pull.collect((err, collectedMessages) => {
          if (err) {
            reject(err);
          } else {
            resolve(collectedMessages);
          }
        })
      );
    });

    // { @key: 1, @key2: 0, @key3: 1 }
    // only one vote per person!
    const reducedVotes = rawVotes.reduce((acc, vote) => {
      acc[vote.value.author] = vote.value.content.vote;
      return acc;
    }, {});

    // gets *only* the people who voted 1
    // [ {@key, %link, value:1, expression}, ... ]
    const voters = Object.entries(reducedVotes)
      .filter(([, vote]) => vote.value === 1)
      .map(([key, vote]) => ({key, ...vote}));

    return voters;
  },
  vote: async (ssb, msgId) => {
    return new Promise(async (resolve, reject) => {
      try {
        ssb.db.publish(
          {
            timestamp: Date.now(),
            author: ssb.id,
            type: "vote",
            vote: {
              link: msgId,
              value: 1,
              expression: "👍🏻",
            },
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
  },
};
