// {
//   FeedId1: {
//     FeedId2: value, // a weight for the edge FeedId1 => FeedId2
//   },
//   FeedId3: {
//     FeedId4: value,
//     FeedId5: value,
//   },
// }
// Weighting
// Following: zero or positive
// Blocking: -1
// Not following and not blocking: -2

module.exports = {
  getSocialGraph: async (ssb) => {
    const relationshipObject = await new Promise((resolve, reject) => {
      ssb.friends.graph((err, graph) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(graph || {});
      });
    });
    return relationshipObject;
  },
  weightings: {
    following: 1,
    blocking: -1,
    indiferent: -2,
  },
};
