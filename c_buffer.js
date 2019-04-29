#!/usr/bin/env node
const getAuthenticatedDrive = require("./functions/googleDriveAuth");
const cleanOnExit = require("./functions/cleanOnExit");
const listDriveFiles = require("./functions/listDriveFiles");
const createBufferPost = require("./functions/createBufferPost");
const moveFileAfterPost = require("./functions/moveFileAfterPost");

(async () => {
  cleanOnExit();

  const drive = await getAuthenticatedDrive();
  const fileIds = await listDriveFiles(drive);
  for (fileId of fileIds) {
    await createBufferPost(fileId, drive);
  }

  // wait 10 seconds for the images to load properly on buffer
  await new Promise(function(resolve) {
    setTimeout(() => resolve(), 10000);
  });

  for (fileId of fileIds) {
    await moveFileAfterPost(fileId, drive);
  }
})();
