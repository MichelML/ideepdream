#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const deepai = require("deepai");
const { deepaiKey, pexelsKey } = require("./.env");
const getAuthenticatedDrive = require("./google_drive_auth");
const uploadFile = require("./uploadFile");
const axios = require("axios");
const nIterations = require("./iterations");

deepai.setApiKey(deepaiKey);

const deepDreamNest = async (src, dest, iterations) => {
  let resp;

  for (let i = 1; i <= iterations; i++) {
    resp = await deepai.callStandardApi("deepdream", {
      image: fs.createReadStream(src)
    });

    fs.unlinkSync(src);

    await download.image({
      url: resp.output_url,
      dest: i === iterations ? dest : src
    });
  }
};

const generateImage = async iterations => {
  const randomFrom1to1000 = Math.floor(Math.random() * 999) + 1;
  const date = new Date();
  const cleanName =
    "pexels_" +
    randomFrom1to1000.toString() +
    "_" +
    date.getDate().toString() +
    "_" +
    date.getMonth().toString() +
    "_" +
    date.getFullYear().toString() +
    "_" +
    date.getTime().toString();
  fs.mkdirSync(`images/${cleanName}`);

  // Download an image with id of 1 to 4000 of 1080px X 1080px from picsum api
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/curated?per_page=1&page=${randomFrom1to1000}`,
      { headers: {Authorization: pexelsKey }}
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
    await deepDreamNest(
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
