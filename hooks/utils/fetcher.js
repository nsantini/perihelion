module.exports = (...args) => fetch(...args).then((res) => res.json());
