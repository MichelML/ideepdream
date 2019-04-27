const fs = require("fs");
const rimraf = require("rimraf");

module.exports = ({ drive, fileName, filePath }) => {
  return new Promise((resolve, reject) => {
    var fileMetadata = {
      name: fileName,
      parents: ["1I1V-AvpjenXppwHX46dcNNQO1pUhAfDy"]
    };
    var media = {
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