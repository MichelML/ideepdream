const fs = require("fs");
const rimraf = require("rimraf");
const { driveFolderId } = require("../.env");

module.exports = ({ drive, fileName, filePath }) => {
  return new Promise((resolve, reject) => {
    const fileMetadata = {
      name: fileName,
      parents: [driveFolderId]
    };
    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream(filePath)
    };
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id"
      },
      function(err, file) {
        if (err) {
          // Handle error
          console.error(err);
          rimraf.sync(filePath.replace(fileName, ""));
          reject(err);
        } else {
          console.log("File " + fileName + " created.");
          rimraf.sync(filePath.replace(fileName, ""));
          resolve();
        }
      }
    );
  });
};
