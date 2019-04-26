#!/usr/bin/env node
const fs = require("fs");
const download = require("image-downloader");
const deepai = require("deepai");
const { deepaiKey } = require("./.env");

deepai.setApiKey(deepaiKey);

module.exports = async function deepDream(src, dest, iterations) {
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