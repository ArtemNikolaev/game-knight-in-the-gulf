import { levelEvents, movements } from "./utils";

export class Level extends EventTarget {
  #ctx;
  #player;
  #renderer;
  #eventHandler;

  #goUp;
  #goDown;
  #goLeft;
  #goRight;

  #key = {};
  #done = false;
  #doorPosition = Math.floor(Math.random() * 16);
  #playerPosition = Math.floor(Math.random() * 16);
  #keyPosition = Math.floor(Math.random() * 16);

  constructor({ ctx, player, eventHandler, renderer }) {
    super();

    this.#ctx = ctx;
    this.#player = player;
    this.#renderer = renderer;
    this.#eventHandler = eventHandler;

    this.#goUp = () => this.#up();
    this.#goDown = () => this.#down();
    this.#goLeft = () => this.#left();
    this.#goRight = () => this.#right();

    this.#eventHandler.addEventListener(movements.up, this.#goUp);
    this.#eventHandler.addEventListener(movements.down, this.#goDown);
    this.#eventHandler.addEventListener(movements.left, this.#goLeft);
    this.#eventHandler.addEventListener(movements.right, this.#goRight);

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

  #validate() {
    if (this.#player.has(this.#key)) {
      this.#keyPosition = this.#playerPosition;

      if (this.#doorPosition === this.#playerPosition) {
        this.#done = true;
      }
    } else if (this.#playerPosition === this.#keyPosition) {
      this.#player.key = this.#key;
    }
  }

  #render() {
    this.#validate();

    this.#renderer.render({
      playerPosition: this.#playerPosition,
      doorPosition: this.#doorPosition,
      keyPosition: this.#keyPosition,
    });

    if (this.#done) this.#onDone();
  }

  #onDone() {
    this.#eventHandler.removeEventListener(movements.up, this.#goUp);
    this.#eventHandler.removeEventListener(movements.down, this.#goDown);
    this.#eventHandler.removeEventListener(movements.left, this.#goLeft);
    this.#eventHandler.removeEventListener(movements.right, this.#goRight);

    setTimeout(() => this.dispatchEvent(new Event(levelEvents.done)), 0);
  }
}
