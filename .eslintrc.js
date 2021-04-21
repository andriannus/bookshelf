module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["prettier", "airbnb-base"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "arrow-body-style": 0,
    quotes: [2, "double", "avoid-escape"],
    "prettier/prettier": "error",
  },
};
