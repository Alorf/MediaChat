class Position {
    top;
    left;
    aspectRatio;

    constructor(
        top,
        left,
        aspectRatio
    ) {
        this.top = top;
        this.left = left;
        this.aspectRatio = aspectRatio;
    }
}

module.exports = {Position};