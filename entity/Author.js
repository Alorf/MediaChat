class Author {
  name;
  image;
  anonymous;

  constructor(name, image, anonymous) {
    this.name = name;
    this.image = image;
    this.anonymous = anonymous;
  }
}

module.exports = { Author };
