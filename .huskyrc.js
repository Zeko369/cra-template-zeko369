module.exports = {
  hooks: {
    "pre-commit": "yarn build && git add ."
  }
};
