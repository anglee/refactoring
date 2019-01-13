module.exports = {
  extends: "eslint:recommended",
  env: {
    node: true,
    es6: true,
    "jest/globals": true,
  },
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 9
  }
};
