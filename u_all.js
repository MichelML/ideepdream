#!/usr/bin/env node
const { exec } = require("child_process");
const getAuthenticatedDrive = require("./functions/google_drive_auth");
const uploadFiles = require("./functions/uploadFiles");
const cleanOnExit = require("./functions/cleanOnExit");

(async () => {
  cleanOnExit();

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
    await Promise.all([cmd("./u_pexels.js"), cmd("./u_pixabay.js")]);
    await uploadFiles(drive);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
