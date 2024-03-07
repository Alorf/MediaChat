
class FileToSend {
  video;
  image;
  text;
  author;
  destination;

  constructor(video, image, text, author, destination) {
    this.video = video;
    this.image = image;
    this.text = text;
    this.author = author;
    this.destination = destination;
  }
}

module.exports = { FileToSend };
