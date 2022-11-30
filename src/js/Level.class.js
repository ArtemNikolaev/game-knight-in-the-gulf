import { levelEvents, movements } from "./utils";

export class Level extends EventTarget {
  #ctx;
  #player;
  #renderer;

  #key = {};
  #doorPosition = Math.floor(Math.random() * 16);
  #playerPosition = Math.floor(Math.random() * 16);
  #keyPosition = Math.floor(Math.random() * 16);

  constructor({ ctx, player, eventHandler, renderer }) {
    super();

    this.#ctx = ctx;
    this.#player = player;
    this.#renderer = renderer;

    eventHandler.addEventListener(movements.up, () => this.#up());
    eventHandler.addEventListener(movements.down, () => this.#down());
    eventHandler.addEventListener(movements.left, () => this.#left());
    eventHandler.addEventListener(movements.right, () => this.#right());

    this.#render();
  }

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

  #keyValidation() {
    if (this.#player.has(this.#key)) {
      this.#keyPosition = this.#playerPosition;
    } else if (this.#playerPosition === this.#keyPosition) {
      this.#player.key = this.#key;
    }
  }

  #render() {
    this.#keyValidation();

    this.#renderer.render({
      playerPosition: this.#playerPosition,
      doorPosition: this.#doorPosition,
      keyPosition: this.#keyPosition,
    });
  }

  onDone() {
    eventHandler.removeEventListener(movements.up, this.#up);
    eventHandler.removeEventListener(movements.down, this.#down);
    eventHandler.removeEventListener(movements.left, this.#left);
    eventHandler.removeEventListener(movements.right, this.#right);

    this.dispatchEvent(new Event(levelEvents.done));
  }
}
