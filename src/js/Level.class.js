import { levelEvents } from "./utils";

export class Level extends EventTarget {
  #ctx;
  #player;
  #renderer;
  #eventHandler;

  #key = {};
  #doorPosition = Math.floor(Math.random() * 16);
  #playerPosition = Math.floor(Math.random() * 16);
  #keyPosition = Math.floor(Math.random() * 16);

  constructor({ ctx, player, eventHandler, renderer }) {
    super();

    this.#ctx = ctx;
    this.#player = player;
    this.#renderer = renderer;
    this.#eventHandler = eventHandler;

    this.#renderer.setColor(this);

    this.#render();
  }

  up() {
    this.#playerPosition = (16 + this.#playerPosition - 4) % 16;
    this.#render();
  }

  down() {
    this.#playerPosition = (this.#playerPosition + 4) % 16;
    this.#render();
  }

  left() {
    const row = Math.floor(this.#playerPosition / 4);
    this.#playerPosition = 4 * row + ((4 + this.#playerPosition - 1) % 4);
    this.#render();
  }

  right() {
    const row = Math.floor(this.#playerPosition / 4);
    this.#playerPosition = 4 * row + ((this.#playerPosition + 1) % 4);
    this.#render();
  }

  get position() {
    return {
      door: this.#doorPosition,
      key: this.#keyPosition,
      player: this.#playerPosition,
    };
  }

  #preRenderActions() {
    if (this.#player.has(this.#key)) {
      this.#keyPosition = this.#playerPosition;
    } else if (this.#playerPosition === this.#keyPosition) {
      this.#player.key = this.#key;
    }

    return true;
  }

  #afterRenderActions() {
    if (
      this.#doorPosition === this.#playerPosition &&
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
    this.dispatchEvent(new Event(levelEvents.done));
  }
}
