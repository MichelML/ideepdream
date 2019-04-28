#!/usr/bin/env node
const fs = require("fs");
const trianglify = require("trianglify");
const svgToImg = require("svg-to-img");
const generate = require("./functions/generate");
const deepDream = require("./functions/deepDream");
const dateSuffix = require("./functions/dateSuffix");

const generateImage = async iterations => {
  const cleanDate = "trianglify_" + dateSuffix();
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
    await deepDream(
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

module.exports = generateImage;

if (require.main === module) {
  (async () => {
    await generate(generateImage);
  })();
}
