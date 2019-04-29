// https://buffer.com/developers/api/updates#updatescreate
const { buffer, driveFolderId } = require("../.env");
const axios = require("axios");
const captionGenerator = require("./captionGenerator");
const formurlencoded = require("form-urlencoded").default;
const request = require("request");

const getRedirectLink = async url =>
  await new Promise(function(resolve) {
    request.get(url, function(err, res, body) {
      resolve(res.request.uri.href);
    });
  });

module.exports = async function createBufferPost(fileId, drive) {
  const imageURL = await getRedirectLink(
    `https://docs.google.com/uc?id=${fileId}`
  );

  return axios
    .post(
      `https://api.bufferapp.com/1/updates/create.json?access_token=${
        buffer.accessToken
      }`,
      formurlencoded({
        text: captionGenerator(),
        profile_ids: [buffer.instagramId],
        media: {
          picture: imageURL,
          thumbnail: imageURL
        }
      })
    )
    .then(reponse => {
      console.log("Buffer post created for " + fileId);
    })
    .catch(response => {
      console.log(response);
    });
};
