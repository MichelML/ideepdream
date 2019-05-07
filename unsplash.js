#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const deepDream = require("./functions/deepDream");
const generate = require("./functions/generate");
const dateSuffix = require("./functions/dateSuffix");
const axios = require("axios");
const { unsplashEnv } = require("./.env");
const open = require("opn");

(async () => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/mtNweauBsMQ?client_id=${
        unsplashEnv.client_id
      }`
    );
    console.log(response.data);
    open(response.data.urls.raw + "&w=2160&h2160");
  } catch (e) {
    console.log(e);
  }
})();

// const generatePost = async iterations => {
//   const randomFrom1to4000 = Math.floor(Math.random() * 4000) + 1;
//   const cleanName = "unsplash_" + randomFrom1to4000.toString() + dateSuffix();
//   fs.mkdirSync(`images/${cleanName}`);

//   try {
//     await download.image({
//       url: `https://source.unsplash.com/random/1080x1080`,
//       dest: "./temp_unsplash.jpg",
//       followRedirect: true
//     });
//   } catch (error) {
//     console.log(error);
//     console.log("Image with ID " + randomFrom1to4000 + " did not work");
//   }

//   try {
//     await deepDream(
//       "./temp_unsplash.jpg",
//       `images/${cleanName}/${cleanName}.jpg`,
//       iterations
//     );
//   } catch (e) {
//     console.log(e);
//   }

//   return {
//     filePath: `images/${cleanName}/${cleanName}.jpg`,
//     fileName: `${cleanName}.jpg`
//   };
// };

// module.exports = generateImage;

// if (require.main === module) {
//   (async () => {
//     await generate(generateImage);
//   })();
// }
