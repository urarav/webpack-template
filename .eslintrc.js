module.exports = {
  extends: ["eslint:recommended"],
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  globals: {
    saveAs: "readonly",
  },
  rules: {
    "no-var": 0,
  },
};
