const fs = require("fs");
const rimraf = require("rimraf");
const { driveFolderId } = require("../.env");
const getAuthenticatedDrive = require("./googleDriveAuth");
const recursive = require("recursive-readdir");
const sharp = require("sharp");

const getFiles = folder =>
  new Promise(function(resolve) {
    recursive(folder, async (err, files) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      resolve(files);
    });
  });

const uploadFiles = async googleDrive => {
  const drive = googleDrive || (await getAuthenticatedDrive());
  const files = await getFiles("images");
  const jpgFiles = files.filter(file => /\.jpg$/.test(file));
  for (let file of jpgFiles) {
    await sharp(file)
      .resize(1080, 1080)
      .jpeg()
      .toFile(file.replace(/\.jpg$/, "_resized.jpg"));
  }

  const filesWithResized = await getFiles("images");
  const resizedFiles = filesWithResized.filter(file =>
    /_resized\.jpg$/.test(file)
  );
  for (let file of resizedFiles) {
    let paths = file.split("/");
    fileName = paths[paths.length - 1];
    filePath = paths.slice(0, -1).join("/");

    await new Promise((resolve, reject) => {
      const fileMetadata = {
        name: fileName,
        parents: [driveFolderId.deepimages]
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
};

module.exports = uploadFiles;

if (require.main === module) {
  (async () => {
    await uploadFiles();
  })();
}
