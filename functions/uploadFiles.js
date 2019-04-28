const fs = require("fs");
const rimraf = require("rimraf");
const { driveFolderId } = require("../.env");
const getAuthenticatedDrive = require("./google_drive_auth");
const recursive = require("recursive-readdir");

const uploadFiles = async googleDrive => {
  const drive = googleDrive || (await getAuthenticatedDrive());
  recursive("images", async (err, files) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    const jpgFiles = files.filter(file => /\.jpg$/.test(file));
    for (file of jpgFiles) {
      let paths = file.split("/");
      fileName = paths[paths.length - 1];
      filePath = paths.slice(0, -1).join("/");

      await new Promise((resolve, reject) => {
        const fileMetadata = {
          name: fileName,
          parents: [driveFolderId]
        };
        const media = {
          mimeType: "image/jpeg",
          body: fs.createReadStream(file)
        };
        drive.files.create(
          {
            resource: fileMetadata,
            media: media,
            fields: "id"
          },
          function(err) {
            if (err) {
              // Handle error
              console.error(err);
              rimraf.sync(filePath);
              reject(err);
            } else {
              console.log("File " + fileName + " created.");
              rimraf.sync(filePath);
              resolve();
            }
          }
        );
      });
    }
  });
};

module.exports = uploadFiles;

if (require.main === module) {
  (async () => {
    await uploadFiles();
  })();
}
