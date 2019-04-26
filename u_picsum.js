#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const getAuthenticatedDrive = require("./google_drive_auth");
const uploadFile = require("./uploadFile");
const nIterations = require("./iterations");
const deepDream = require("./deepDream");

const generateImage = async iterations => {
  const randomFrom1to1079 = Math.floor(Math.random() * 1079) + 1;
  const date = new Date();
  const cleanName =
    "picsum_" +
    randomFrom1to1079.toString() +
    "_" +
    date.getDate().toString() +
    "_" +
    date.getMonth().toString() +
    "_" +
    date.getFullYear().toString() +
    "_" +
    date.getTime().toString();
  fs.mkdirSync(`images/${cleanName}`);

  // Download an image with id of 1 to 1079 of 1080px X 1080px from picsum api
  try {
    await download.image({
      url: `https://picsum.photos/id/${randomFrom1to1079}/1080/1080`,
      dest: "./temp_picsum.jpg"
    });
  } catch (error) {
    console.log(error);
    console.log("Image with ID " + randomFrom1to1079 + " did not work");
  }

  try {
    await deepDream(
      "./temp_picsum.jpg",
      `images/${cleanName}/${cleanName}.jpg`,
      iterations
    );
  } catch (e) {
    console.log(e);
  }

  return {
    filePath: `images/${cleanName}/${cleanName}.jpg`,
    fileName: `${cleanName}.jpg`
  };
};

if (require.main === module) {
  (async () => {
    // Get authenticated google drive instance
    const drive = await getAuthenticatedDrive();

    const nImages = parseInt(process.argv[process.argv.length - 1], 10);
    for (let i = 1; i <= nImages; i++) {
      // Generate images
      const image = await generateImage(nIterations());
      // Upload images to Google Drive
      await uploadFile({ drive, ...image });
    }
  })();
}
