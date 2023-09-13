module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        // alias: {
        //   "~": "./src",
        // },
        extensions: [".js", ".jsx", ".json", ".tsx", ".ts"],
      },
    ],
  ],
};
