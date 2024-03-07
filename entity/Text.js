
class Text {
  textData;
  fontFamily;
  fontColor;
  fontSize;

  position;

  constructor(
    textData,
    fontFamily,
    fontColor,
    fontSize,
    position
  ) {
    this.textData = textData;
    this.fontFamily = fontFamily;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
    this.position = position;
  }
}

module.exports = { Text };
