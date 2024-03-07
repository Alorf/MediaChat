
class Image {
  url;
  width;
  height;
  fullscreen;

  position;
  isBase64;

  constructor(
    url,
    width,
    height,
    fullscreen,
    position,
    isBase64
  ) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.fullscreen = fullscreen;
    this.position = position;
    this.isBase64 = isBase64;
  }
}

module.exports = { Image };