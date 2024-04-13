
class Text {
  textData;
  fontFamily;
  fontColor;
  fontSize;
  duration;

  position;

  constructor(
    textData,
    fontFamily,
    fontColor,
    fontSize,
    duration,
    position
  ) {
    this.textData = textData;
    this.fontFamily = fontFamily;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
    this.duration = duration;
    this.position = position;
  }
}

module.exports = { Text };
