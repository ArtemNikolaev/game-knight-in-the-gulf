import { levelEvents, movements } from "./utils";

export class Level extends EventTarget {
  #ctx;
  #player;
  #renderer;
  #eventHandler;

  #abortController = new AbortController();
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

    this.#eventHandler.addEventListener(movements.up, () => this.#up(), {
      signal: this.#abortController.signal,
    });
    this.#eventHandler.addEventListener(movements.down, () => this.#down(), {
      signal: this.#abortController.signal,
    });
    this.#eventHandler.addEventListener(movements.left, () => this.#left(), {
      signal: this.#abortController.signal,
    });
    this.#eventHandler.addEventListener(movements.right, () => this.#right(), {
      signal: this.#abortController.signal,
    });

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
    } else if (this.#playerPosition === this.#keyPosition) {
      this.#player.key = this.#key;
    }

    if (
      this.#doorPosition === this.#playerPosition &&
      this.#player.has(this.#key)
    ) {
      this.#done = true;
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
    this.#abortController.abort();

    this.dispatchEvent(new Event(levelEvents.done));
  }
}
