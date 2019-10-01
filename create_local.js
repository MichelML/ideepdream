#!/usr/bin/env node
const fs = require("fs");
const deepDream = require("./functions/deepDream");
const nIterations = require("./functions/iterations");
const uploadFiles = require("./functions/uploadFiles");
const getAuthenticatedDrive = require("./functions/googleDriveAuth");

const generateImages = async () => {
  const files = fs.readdirSync("images");
  for (file of files) {
    try {
      await deepDream(`images/${file}`, `images/${file.replace(".jpg", "_dream.jpg")}`, nIterations());
    } catch (e) {
      console.log(e);
    }
  }
};

if (require.main === module) {
  (async () => {
    const drive = await getAuthenticatedDrive();
    await generateImages();
    await uploadFiles(drive, false);
  })();
}
