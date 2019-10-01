#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const { pixaBayKey } = require("./.env");
const axios = require("axios");
const deepDream = require("./functions/deepDream");
const generate = require("./functions/generate");
const dateSuffix = require("./functions/dateSuffix");
const randomWord = require("./functions/randomWord");
const randomItem = require("./functions/randomItem");

const generateImage = async iterations => {
  const cleanName = "pixabay_" + dateSuffix();
  fs.mkdirSync(`images/${cleanName}`);

  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: pixaBayKey,
        min_width: 1080,
        q: randomWord(),
        image_type: "photo",
      }
    });
    await download.image({
      url: randomItem(response.data.hits).largeImageURL,
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
    await generate(generateImage);
  })();
}
