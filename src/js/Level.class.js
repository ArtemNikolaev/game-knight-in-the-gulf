import { levelEvents, movements } from "./utils";

export class Level extends EventTarget {
  #ctx;
  #player;

  #doorPosition = Math.floor(Math.random() * 16);
  #playerPosition = Math.floor(Math.random() * 16);

  constructor({ ctx, player, eventHandler }) {
    super();

    this.#ctx = ctx;
    this.#player = player;

    eventHandler.addEventListener(movements.up, () => this.#up());
    eventHandler.addEventListener(movements.down, () => this.#down());
    eventHandler.addEventListener(movements.left, () => this.#left());
    eventHandler.addEventListener(movements.right, () => this.#right());
  }

  #generateField() {}

  #up() {
    this.#playerPosition = (16 + this.#playerPosition - 4) % 16;
    this.#render();
  }

  #down() {
    this.#playerPosition = (this.#playerPosition + 4) % 16;
    this.#render();
  }

  #left() {
    const row = Math.floor(this.#playerPosition / 4);
    this.#playerPosition = 4 * row + ((4 + this.#playerPosition - 1) % 4);
    this.#render();
  }

  #right() {
    const row = Math.floor(this.#playerPosition / 4);
    this.#playerPosition = 4 * row + ((this.#playerPosition + 1) % 4);
    this.#render();
  }

  #render() {}

  onDone() {
    eventHandler.removeEventListener(movements.up, this.#up);
    eventHandler.removeEventListener(movements.down, this.#down);
    eventHandler.removeEventListener(movements.left, this.#left);
    eventHandler.removeEventListener(movements.right, this.#right);

    this.dispatchEvent(new Event(levelEvents.done));
  }
}
