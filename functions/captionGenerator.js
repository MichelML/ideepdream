const randomItem = require("./randomItem");

const tags = [
  `#deepdream #deeplearning #arts #visualarts  #visualart #photography #visualartist #javascript #fun #psychedelics #psychedelicarts #nodejs #unsplashphotos #landscape #python #machinelearning #ai #artificialintelligence #abstractpainting #abstractart #drippingart #artists #mindfulness #consciousnessshift #trippy #programming #software`,
  ` #tech #technology #techno #technologies #techie #techy #software #softwareengineer #softwareengineering #artificialintelligence #ai #ml #machinelearning #deeplearning #javascript #nodejs #python #api #deepdream #deep #engineer #engineers #engineering #deepdream #deeplearning #arts #visualarts  #visualart #photography`,
  `#photo #photos #photooftheday #photography #photographers #photoshoot #photoshop #photos #photogrid #photograph #photoart #photojournalism #photographie #photographs #photographerlife #phototechnique #phototech #deepdream #deeplearning #arts #visualarts  #visualart #fun #psychedelics #psychedelicarts #nodejs #abstractpainting`,
  `#art #artistoninstagram #artistsoninstagram #artist #arte #artesanato #artsy #artspotlight #arts #artwork #artspotlight #artsy #artistic #artesanal #artlovers #artofvisuals #artworks #artwork #streetart #abstractart #artbasel #artists #deepdream #deeplearning #arts #visualarts  #visualart #photography #visualartist #javascript`,
  `#graphic #graphicdesigner #graphicdesign #graphiccontent #graphic_art #graphic_arts #graphic45 #graphicliner #graphictatoo #graphiart #graphicdesigns #graphicgang #graphicinspiration #graphicnovel #graphicoftheday #graphicartist #graphicdesigncentral #deepdream #deeplearning #arts #visualarts  #visualart #visualartist #javascript`,
  `#psych #psychology #psychedelic #psychedelics #psychic #psychics #psychedelicart #psycho #psychologie #psychotherapie #psychedelica #psychodelicart #psychedelicpainting #psychedelicarts #psychedelicfestival #psychedelicpaint #art #artistoninstagram #artistsoninstagram #artist #arte #artesanato #artsy #artspotlight #arts #artwork`,
  `#mind #mindset #mindthegap #mindful #mindbodygreen #mindsetofgreatness #mindfulness #minds #mindgames #medite #meditations #meditar #meditaciones #meditated #meditacao #meditacion #meditationquotes #meditate #meditative #meditativeart #art #artistoninstagram #artistsoninstagram #artist #arte #artesanato #artsy #arts #artwork`,
  `#paint #paints #painting #paintings #paintmixing #painter #painted #painteveryday #speedpaint #paintisdead #paintingprocess #acrylicpainting #painttoolsai #paintingoftheday #originalpainting #acrylicpaintings #oilpainting #paintlife #digitalpainting #paintingart #paintersofinstagram #intuitivepainting #paintparty #digitalpaint`,
  `#abstract #abstractart #abstractarts #abstract_art #abstract_arts #abstracts #abstracto #abstract_post #abstractpost #abstractposts #abstractpost #abstractors #abstractartist #abstractlandscape #abstractpainting #abstractionism #abstractphoto #abstractobsession #abstractpainter #abstractpainters #abstracture #abstractartwork`,
  `#dream #dreams #dreamy #dreamer #dreamers #dreamlife #dreamcatchers #dreamcatcher #dreamville #dreamland_arts_of_nature #dreamchaser #dream_chaser #dream_chasers #dreamchasers #dreamwork #dreaminstreets #dreambigger #deepdream #deeplearning #arts #visualarts  #visualart #photography #visualartist #javascript`,
  `#innovation #innovations #innovative #innovators #innovator #innovate #innovar #innovative #innov8 #innovazione #innovaciones #innovador #innovadores #deepdream #deeplearning #arts #visualarts  #visualart #photography #visualartist #javascript #fun #psychedelics #psychedelicarts #nodejs #unsplashphotos #landscape`
];

module.exports = function captionGenerator() {
  return `caption
  .
  .
  ${randomItem(tags)}`;
};
