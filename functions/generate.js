const nIterations = require("./iterations");

module.exports = async function generate(imageGenerator) {
  const nImages = parseInt(process.argv[process.argv.length - 1], 10);
  for (let i = 1; i <= nImages; i++) {
    // Generate images
    const image = await imageGenerator(nIterations());
  }
};
