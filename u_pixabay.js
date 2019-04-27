#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const { pixaBayKey } = require("./.env");
const getAuthenticatedDrive = require("./functions/google_drive_auth");
const axios = require("axios");
const deepDream = require("./functions/deepDream");
const generateAndUpload = require("./functions/generateAndUpload");
const dateSuffix = require("./functions/dateSuffix");
const randomWord = require("./functions/randomWord");

const generateImage = async iterations => {
  const cleanName = "pixabay_" + dateSuffix();
  fs.mkdirSync(`images/${cleanName}`);

  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: pixaBayKey,
        q: randomWord(),
        type: "photo",
        editors_choice: true
      }
    });
    await download.image({
      url: response.data.hits[0].largeImageURL,
      dest: "./temp_pixabay.jpg",
      followRedirect: true
    });
  } catch (error) {
    console.log(error);
    console.log("Image with ID " + randomFrom1to1000 + " did not work");
  }

  try {
    await deepDream(
      "./temp_pixabay.jpg",
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

module.exports = generateImage;

if (require.main === module) {
  (async () => {
    // Get authenticated google drive instance
    const drive = await getAuthenticatedDrive();
    await generateAndUpload(drive, generateImage);
  })();
}
