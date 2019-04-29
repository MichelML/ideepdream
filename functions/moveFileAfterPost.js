const { driveFolderId } = require("../.env");

module.exports = (fileId, drive) => {
  return new Promise(function(resolve) {
    drive.files.update(
      {
        fileId: fileId,
        addParents: driveFolderId.deepimagesposted,
        removeParents: driveFolderId.deepimages,
        fields: "id, parents"
      },
      function(err, file) {
        if (err) {
          console.log(err);
        } else {
          console.log("File " + fileId + " moved to deepimagesposted folder.");
        }
        resolve();
      }
    );
  });
};
