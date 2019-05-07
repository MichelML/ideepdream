const { driveFolderId } = require("../.env");

module.exports = async function listDriveFiles(drive) {
  const response = await drive.files.list({
      pageSize: 100,
      q: `'${driveFolderId.deepimages}' in parents and trashed = false and mimeType = 'image/jpeg'`
  });

  let i = 0;
  let filesIds = [];
  const numberOfFiles = process.argv[process.argv.length - 1];
  while (i < numberOfFiles) {
    response.data.files[i] && filesIds.push(response.data.files[i].id);
    i = i + 1;
  }

  return filesIds;
};
