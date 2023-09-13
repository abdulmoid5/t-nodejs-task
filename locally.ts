const localApp = require("./app");

const PORT = process.env.PORT || 8080;

localApp.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
