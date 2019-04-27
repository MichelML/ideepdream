#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const { pexelsKey } = require("./.env");
const getAuthenticatedDrive = require("./functions/google_drive_auth");
const axios = require("axios");
const deepDream = require("./functions/deepDream");
const generateAndUpload = require("./functions/generateAndUpload");
const dateSuffix = require("./functions/dateSuffix");

const generateImage = async iterations => {
  const randomFrom1to1000 = Math.floor(Math.random() * 999) + 1;
  const cleanName = "pexels_" + randomFrom1to1000.toString() + dateSuffix();
  fs.mkdirSync(`images/${cleanName}`);

  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/curated?per_page=1&page=${randomFrom1to1000}`,
      { headers: { Authorization: pexelsKey } }
    );
    await download.image({
      url: response.data.photos[0].src.large,
      dest: "./temp_pexels.jpg",
      followRedirect: true
    });
  } catch (error) {
    console.log(error);
    console.log("Image with ID " + randomFrom1to1000 + " did not work");
  }

  try {
    await deepDream(
      "./temp_pexels.jpg",
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
