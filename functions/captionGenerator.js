const randomItem = require("./randomItem");
const _ = require("lodash");

const tags = [
  "#deepdream #deeplearning #arts #visualarts #visualart #photography #visualartist #javascript #fun #psychedelics #psychedelicarts #nodejs #unsplashphotos #landscape #python #machinelearning #artificialintelligence #abstractpainting #abstractart #drippingart #artists #mindfulness #consciousnessshift #trippy #programming #software #softwareengineering #painting",
  "#tech #technology #techno #technologies #techie #techy #software #softwareengineer #softwareengineering #artificialintelligence #machinelearning #deeplearning #javascript #nodejs #python #api #deepdream #deep #engineer #engineers #engineering #arts #visualart #photography #visualarts #artificialintelligence #machinelearning #deeplearning",
  "#psych #psychology #psychedelic #psychedelics #psychic #psychics #psychedelicart #psycho #psychologie #psychotherapie #psychedelica #psychodelicart #psychedelicpainting #psychedelicarts #psychedelicfestival #psychedelicpaint #art #artistoninstagram #artistsoninstagram #artist #arte #artesanato #artsy #artspotlight #arts #artwork #programming #softwareengineering",
  "#art #artistoninstagram #artistsoninstagram #artist #arte #artesanato #artsy #artspotlight #arts #artwork #artistic #artesanal #artlovers #artofvisuals #artworks #streetart #abstractart #artbasel #artists #deepdream #deeplearning #visualarts #visualart #photography #visualartist #javascript #softwareengineering #artificialintelligence #machinelearning",
  "#paint #paints #painting #paintings #paintmixing #painter #painteveryday #abstract #abstractart #abstractarts #abstract_art #abstract_arts #painttoolsai #paintingoftheday #originalpainting #paintlife #digitalpainting #paintingart #paintersofinstagram #intuitivepainting #digitalpaint #abstractartwork #artificialintelligence #machinelearning #deeplearning",
];

module.exports = function captionGenerator() {
  return `caption.
  .
  .
  #buffer ${randomItem(tags)}`;
};

/**
 * Tags sequence generator, uncomment to generate additional ones
 */
// const permanentTags =
//   " #deepdream #deeplearning #arts #visualarts #artificialintelligence #ai #machinelearning #intelligentart #automatedart #assistedart #visualart #photography #visualartist #javascript #psychedelics #psychedelicarts #nodejs";
// const maxWords =
//   _.max(tags.map(hashtags => hashtags.split(" ").length)) -
//   permanentTags.split(" ").length -
//   2;
// let hashtags = [];
// let all = [];
// const allTags = _.flatten(tags.map(hashtags => hashtags.split(" ")));
// for (let i = 0; i < maxWords; i++) {
//   hashtags.push(randomItem(allTags));
// }
// all.push(_.uniq((hashtags.join(" ") + permanentTags).split(" ")).join(" "));
// console.log(all);
