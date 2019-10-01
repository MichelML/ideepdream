#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const generate = require("./functions/generate");
const deepDream = require("./functions/deepDream");
const dateSuffix = require("./functions/dateSuffix");

const generateImage = async iterations => {
  const randomFrom1to1079 = Math.floor(Math.random() * 1079) + 1;
  const cleanName = "picsum_" + randomFrom1to1079.toString() + dateSuffix();
  fs.mkdirSync(`images/${cleanName}`);

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

module.exports = generateImage;

if (require.main === module) {
  (async () => {
    await generate(generateImage);
  })();
}
