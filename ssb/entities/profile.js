const blob = require("./blob");
const socialGraph = require("./utils/socialGraph");

const getProfile = async (ssb, feedId) => {
  return new Promise((resolve, reject) => {
    ssb.db.onDrain("aboutSelf", () => {
      try {
        const profile = ssb.db.getIndex("aboutSelf").getProfile(feedId);
        resolve(profile);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
};

module.exports = {
  getProfile: async (ssb, feedId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { name, description, image } = await getProfile(ssb, feedId);
        let imageBlob = "";
        try {
          if (image) {
            imageBlob = await blob.getBlob(ssb, image);
          }
        } catch (e) {
          console.log("Error getting image", e);
        }
        const profile = {
          id: feedId,
          name: name || feedId.slice(1, 1 + 8),
          description: description || "",
          image: image || "",
          imageBlob,
        };
        if (feedId !== ssb.id) {
          const graph = await socialGraph.getSocialGraph(ssb);
          profile.following =
            graph[ssb.id][feedId] === socialGraph.weightings.following;
        }
        resolve(profile);
      } catch (err) {
        reject(err);
      }
    });
  },
  updateProfile: async (ssb, profile) => {
    return new Promise(async (resolve, reject) => {
      try {
        ssb.db.publish(
          {
            about: ssb.id,
            type: "about",
            ...profile,
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
