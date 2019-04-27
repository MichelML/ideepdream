const uploadFile = require("./uploadFile");
const nIterations = require("./iterations");

module.exports = async function generateAndUpload(drive, imageGenerator) {
  const nImages = parseInt(process.argv[process.argv.length - 1], 10);
  for (let i = 1; i <= nImages; i++) {
    // Generate images
    const image = await imageGenerator(nIterations());
    // Upload images to Google Drive
    await uploadFile({ drive, ...image });
  }
};
