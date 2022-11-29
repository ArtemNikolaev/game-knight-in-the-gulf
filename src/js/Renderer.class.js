export class Renderer {
  #canvas;
  #ctx;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");

    this.#setSize();
    window.addEventListener("resize", () => this.#setSize());
  }

  #setSize() {
    this.#canvas.setAttribute("width", this.#canvas.offsetWidth);
    this.#canvas.setAttribute("height", this.#canvas.offsetHeight);

    this.render();
  }

  render(playerPosition, keyPosition, doorPosition) {
    this.#drawField();
    this.#drawKnight(0);
    this.#drawExit(1);
    this.#drawKey(2);
  }

  #drawField() {
    const width = Math.floor(this.#canvas.width / 4);
    const height = Math.floor(this.#canvas.height / 4);

    this.#ctx.fillStyle = "#4186D3";
    this.#ctx.fillRect(0, 0, width, height);
    this.#ctx.fillRect(width * 2, 0, width, height);
    this.#ctx.fillRect(width, height, width, height);
    this.#ctx.fillRect(width * 3, height, width, height);
    this.#ctx.fillRect(0, height * 2, width, height);
    this.#ctx.fillRect(width * 2, height * 2, width, height);
    this.#ctx.fillRect(width, height * 3, width, height);
    this.#ctx.fillRect(width * 3, height * 3, width, height);

    this.#ctx.fillStyle = "#FFB440";
    this.#ctx.fillRect(width, 0, width, height);
    this.#ctx.fillRect(width * 3, 0, width, height);
    this.#ctx.fillRect(0, height, width, height);
    this.#ctx.fillRect(width * 2, height, width, height);
    this.#ctx.fillRect(width, height * 2, width, height);
    this.#ctx.fillRect(width * 3, height * 2, width, height);
    this.#ctx.fillRect(0, height * 3, width, height);
    this.#ctx.fillRect(width * 2, height * 3, width, height);
  }

  #drawKnight(playerPosition) {
    this.#drawTile(playerPosition, "src/assets/knight.png");
  }

  #drawExit(doorPosition) {
    this.#drawTile(doorPosition, "src/assets/door.png");
  }

  #drawKey(doorPosition) {
    this.#drawTile(doorPosition, "src/assets/key.png");
  }

  #drawTile(position, imageUrl) {
    const width = Math.floor(this.#canvas.width / 4);
    const height = Math.floor(this.#canvas.height / 4);

    const img = new Image();
    img.src = imageUrl;
    img.setAttribute("width", "10");

    let imgWidth;
    let imgHeight;
    if (width >= height) {
      imgWidth = Math.floor((height / 4) * 3);
      imgHeight = height;
    } else {
      imgWidth = width;
      imgHeight = Math.floor((width / 3) * 4);
    }

    const x = width * Math.floor(position % 4);
    const y = height * Math.floor(position / 4);
    console.log({ position, x, y });
    img.onload = () =>
      this.#ctx.drawImage(
        img,
        x + (width - imgWidth) / 2,
        y,
        imgWidth,
        imgHeight
      );
  }
}
