
class Video {
  url;
  width;
  height;

  muted;
  greenscreen;
  fullscreen;

  currentTime;

  position;
  isBase64;

  constructor(
    url,
    width,
    height,
    muted,
    greenscreen,
    fullscreen,
    currentTime,
    position,
    isBase64
  ) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.muted = muted;
    this.greenscreen = greenscreen;
    this.fullscreen = fullscreen;
    this.currentTime = currentTime;
    this.position = position;
    this.isBase64 = isBase64;
  }
}

module.exports = { Video };
