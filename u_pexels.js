#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const { pexelsKey } = require("./.env");
const axios = require("axios");
const deepDream = require("./functions/deepDream");
const generate = require("./functions/generate");
const dateSuffix = require("./functions/dateSuffix");
const randomItem = require("./functions/randomItem");
const randomWord = require("./functions/randomWord");

const generateImage = async iterations => {
  const randomFrom1to1000 = Math.floor(Math.random() * 999) + 1;
  const cleanName = "pexels_" + randomFrom1to1000.toString() + dateSuffix();
  fs.mkdirSync(`images/${cleanName}`);

  try {
    const response = await axios.get(`https://api.pexels.com/v1/curated`, {
      headers: { Authorization: pexelsKey },
      params: {
        per_page: 10,
        query: randomWord()
      }
    });
    await download.image({
      url: randomItem(response.data.photos).src.large,
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
    await generate(generateImage);
  })();
}
