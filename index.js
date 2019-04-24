#!/usr/bin/env node
const fs = require("fs");
const trianglify = require("trianglify");
const svgToImg = require("svg-to-img");
const download = require("image-downloader");
const deepai = require("deepai");
const { deepaiKey } = require("./.env");

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
  fs.mkdirSync(cleanDate);

  // generate triangle
  const variance = Math.round(Math.random() * 100) / 100;
  const seed = Math.round(Math.random() * 1000);
  const trianglifyOptions = { variance, seed, x_colors: "random" };
  const allOptions = { ...trianglifyOptions, iterations };
  const svg = trianglify({ variance, seed, x_colors: "random" }).svg();
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  fs.writeFileSync(`${cleanDate}/${cleanDate}.svg`, svg.outerHTML, "utf8");

  await svgToImg.from(svg.outerHTML).toJpeg({
    path: "./temp.jpg"
  });

  try {
    await deepDreamNest(
      "./temp.jpg",
      `${cleanDate}/${cleanDate}.jpg`,
      iterations
    );
    fs.writeFileSync(
      `${cleanDate}/${cleanDate}.txt`,
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
};

if (require.main === module) {
  (async () => {
    const nImages = parseInt(process.argv[process.argv.length - 1], 10);
    for (let i = 1; i <= nImages; i++) {
      const randomFrom1to4 = Math.floor(Math.random() * 4) + 1;
      await generateImage(randomFrom1to4);
    }
  })();
}
