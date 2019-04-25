#!/usr/bin/env node
const fs = require("fs");
const trianglify = require("trianglify");
const svgToImg = require("svg-to-img");
const download = require("image-downloader");
const deepai = require("deepai");
const { deepaiKey } = require("./.env");
const getAuthenticatedDrive = require("./google_drive_auth");

deepai.setApiKey(deepaiKey);

const deepDreamNest = async (src, dest, iterations) => {
  let resp;

  for (let i = 1; i <= iterations; i++) {
    resp = await deepai.callStandardApi("deepdream", {
      image: fs.createReadStream(src)
    });

    fs.unlinkSync(src);

    await download.image({
      url: resp.output_url,
      dest: i === iterations ? dest : src
    });
  }
};

const generateImage = async iterations => {
  const date = new Date();
  const cleanDate =
    date.getDate().toString() +
    "_" +
    date.getMonth().toString() +
    "_" +
    date.getFullYear().toString() +
    "_" +
    date.getTime().toString();
  fs.mkdirSync(`images/${cleanDate}`);

  // generate triangle
  const variance = Math.round(Math.random() * 100) / 100;
  const seed = Math.round(Math.random() * 1000);
  const trianglifyOptions = { variance, seed, x_colors: "random" };
  const allOptions = { ...trianglifyOptions, iterations };
  const svg = trianglify({ variance, seed, x_colors: "random" }).svg();
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  fs.writeFileSync(
    `images/${cleanDate}/${cleanDate}.svg`,
    svg.outerHTML,
    "utf8"
  );

  await svgToImg.from(svg.outerHTML).toJpeg({
    path: "./temp.jpg"
  });

  try {
    await deepDreamNest(
      "./temp.jpg",
      `images/${cleanDate}/${cleanDate}.jpg`,
      iterations
    );
    fs.writeFileSync(
      `images/${cleanDate}/${cleanDate}.txt`,
      `
    trianglify variance: ${allOptions.variance}
    trianglify seed: ${allOptions.seed}
    trianglify x_colors: ${allOptions.x_colors}
    deep dream iterations: ${allOptions.iterations}
    `,
      "utf-8"
    );
  } catch (e) {
    console.log(e);
  }

  return {
    filePath: `images/${cleanDate}/${cleanDate}.jpg`,
    fileName: `${cleanDate}.jpg`
  };
};

const uploadFile = ({ drive, fileName, filePath }) => {
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
          reject(err);
        } else {
          console.log("File " + fileName + " created.");
          resolve();
        }
      }
    );
  });
};

if (require.main === module) {
  (async () => {
    // Get authenticated google drive instance
    const drive = await getAuthenticatedDrive();

    // Generate images
    let images = [];
    const nImages = parseInt(process.argv[process.argv.length - 1], 10);
    for (let i = 1; i <= nImages; i++) {
      const randomFrom1to4 = Math.floor(Math.random() * 4) + 1;
      const image = await generateImage(randomFrom1to4);
      images.push(image);
    }

    // Upload images to Google Drive
    for (img of images) {
      await uploadFile({ drive, ...img });
    }
  })();
}
