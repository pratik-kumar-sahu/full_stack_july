const Jimp = require("jimp");

module.exports = async function combineTextImage(name) {
  const image = await Jimp.read(`${__dirname}/uploads/image.png`);

  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  image.print(font, 10, 10, name);

  await image.writeAsync(`${__dirname}/uploads/image.png`);
};
