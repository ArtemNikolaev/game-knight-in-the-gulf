import { colorSchemeGeneratorFunc } from "./utils";

export class Renderer {
  #canvas;
  #ctx;
  #colorScheme = new WeakMap();
  #colorSchemeList = colorSchemeGeneratorFunc();

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");

    this.#setSize();
    window.addEventListener("resize", () => this.#setSize());
  }

  #setSize() {
    this.#canvas.setAttribute("width", this.#canvas.offsetWidth);
    this.#canvas.setAttribute("height", this.#canvas.offsetHeight);
  }

  render(level) {
    const colorScheme = this.#colorScheme.get(level);
    const position = level.position;

    this.#drawField(colorScheme);
    this.#drawExit(position.door);
    this.#drawKnight(position.player);
    this.#drawKey(position.key);
  }

  setColor(level) {
    this.#colorScheme.set(level, this.#colorSchemeList.next().value);
  }

  #drawField(colorScheme) {
    const iterator = colorScheme
      ? colorScheme.values()
      : this.#colorSchemeList[0].values();

    const width = Math.floor(this.#canvas.width / 4);
    const height = Math.floor(this.#canvas.height / 4);

    this.#ctx.fillStyle = iterator.next().value;
    this.#ctx.fillRect(0, 0, width, height);
    this.#ctx.fillRect(width * 2, 0, width, height);
    this.#ctx.fillRect(width, height, width, height);
    this.#ctx.fillRect(width * 3, height, width, height);
    this.#ctx.fillRect(0, height * 2, width, height);
    this.#ctx.fillRect(width * 2, height * 2, width, height);
    this.#ctx.fillRect(width, height * 3, width, height);
    this.#ctx.fillRect(width * 3, height * 3, width, height);

    this.#ctx.fillStyle = iterator.next().value;
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
    this.#drawTile(playerPosition, document.querySelector(".knight-image"));
  }

  #drawExit(doorPosition) {
    this.#drawTile(doorPosition, document.querySelector(".door-image"));
  }

  #drawKey(doorPosition) {
    this.#drawTile(doorPosition, document.querySelector(".key-image"));
  }

  #drawTile(position, imageEl) {
    const width = Math.floor(this.#canvas.width / 4);
    const height = Math.floor(this.#canvas.height / 4);

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
    this.#ctx.drawImage(
      imageEl,
      x + (width - imgWidth) / 2,
      y,
      imgWidth,
      imgHeight
    );
  }
}
