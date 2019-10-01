#!/usr/bin/env node
const { exec } = require("child_process");
const getAuthenticatedDrive = require("./functions/googleDriveAuth");
const uploadFiles = require("./functions/uploadFiles");

(async () => {
  const drive = await getAuthenticatedDrive();

  const nImages = parseInt(process.argv[process.argv.length - 1], 10);

  const cmd = scriptPath =>
    new Promise(resolve => {
      exec(`node ${scriptPath} ${nImages}`, (err, stdout) => {
        if (err) {
          console.log(err);
        }

        console.log(stdout);
        resolve(scriptPath + " completed.");
      });
    });

  try {
    await Promise.all([cmd("./create_pexels.js"), cmd("./create_pixabay.js")]);
    await uploadFiles(drive);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
