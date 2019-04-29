// https://buffer.com/developers/api/updates#updatescreate
const { buffer } = require("../.env");
const axios = require("axios");
const formurlencoded = require("form-urlencoded").default;
const request = require("request");

(async () => {
  const redirectLink = await new Promise(resolve => {
    request.get(
      "https://docs.google.com/uc?id=1Usj4xeBZ1vtjxtUCgH1ye87Wk4guHPc7",
      function(err, res, body) {
        console.log(res.request.uri.href);
        resolve(res.request.uri.href);
      }
    );
  });

  const caption = `caption this
.⠀⠀
.⠀⠀
#deepdream #deeplearning #arts #visualarts  #visualart #photography #visualartist #javascript #fun #psychedelics #psychedelicarts #nodejs #unsplashphotos #landscape #python #machinelearning #ai #artificialintelligence #abstractpainting #abstractart #drippingart #artists #mindfulness #consciousnessshift #trippy #programming #software #softwareengineering #painting
`;

  axios
    .post(
      `https://api.bufferapp.com/1/updates/create.json?access_token=${
        buffer.accessToken
      }`,
      formurlencoded({
        text: caption,
        profile_ids: [buffer.instagramId],
        media: {
          picture: redirectLink,
          thumbnail: redirectLink
        }
      })
    )
    .then(reponse => console.log(response.data))
    .catch(({ response }) => console.log(response.data));
})();
