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
    quotes: [2, "double", "avoid-escape"],
    "prettier/prettier": "error",
  },
};