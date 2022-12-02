import { levelEvents, movements } from "./utils";

export class Level extends EventTarget {
  #ctx;
  #player;
  #renderer;
  #eventHandler;

  #abortController = new AbortController();
  #key = {};
  doorPosition = Math.floor(Math.random() * 16);
  playerPosition = Math.floor(Math.random() * 16);
  keyPosition = Math.floor(Math.random() * 16);

  constructor({ ctx, player, eventHandler, renderer }) {
    super();

    this.#ctx = ctx;
    this.#player = player;
    this.#renderer = renderer;
    this.#eventHandler = eventHandler;

    this.#renderer.setColor(this);

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
    this.playerPosition = (16 + this.playerPosition - 4) % 16;
    this.#render();
  }

  #down() {
    this.playerPosition = (this.playerPosition + 4) % 16;
    this.#render();
  }

  #left() {
    const row = Math.floor(this.playerPosition / 4);
    this.playerPosition = 4 * row + ((4 + this.playerPosition - 1) % 4);
    this.#render();
  }

  #right() {
    const row = Math.floor(this.playerPosition / 4);
    this.playerPosition = 4 * row + ((this.playerPosition + 1) % 4);
    this.#render();
  }

  #preRenderActions() {
    if (this.#player.has(this.#key)) {
      this.keyPosition = this.playerPosition;
    } else if (this.playerPosition === this.keyPosition) {
      this.#player.key = this.#key;
    }

    return true;
  }

  #afterRenderActions() {
    if (
      this.doorPosition === this.playerPosition &&
      this.#player.has(this.#key)
    ) {
      return this.#onDone();
    }
  }

  #render() {
    this.#preRenderActions();

    this.#renderer.render(this);

    this.#afterRenderActions();
  }

  #onDone() {
    this.#abortController.abort();

    this.dispatchEvent(new Event(levelEvents.done));
  }
}
