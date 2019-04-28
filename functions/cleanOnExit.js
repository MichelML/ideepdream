const rimraf = require("rimraf");
const fs = require("fs");

module.exports = () => process.on("exit", () => {
  rimraf.sync("images");
  fs.mkdirSync("images");
});
