import { Level } from "./Level.class";
import { Player } from "./Player.class";
import { KeyUpHandlerClass } from "./KeyUpHandler.class";
import { levelEvents, movements } from "./utils";
import { Renderer } from "./Renderer.class";

export class Game {
  #renderer;
  #level;
  #player = new Player();
  #eventHandler = new KeyUpHandlerClass();
  #abortController = new AbortController();

  constructor(canvas) {
    this.#renderer = new Renderer(canvas);

    this.#createKeyBindings();
    this.#createLevel();
  }

  #createKeyBindings() {
    const map = new Map();
    map.set("KeyW", movements.up);
    map.set("KeyS", movements.down);
    map.set("KeyA", movements.left);
    map.set("KeyD", movements.right);

    this.#eventHandler.addKeyEvents(map);
  }

  #createLevel() {
    if (this.#level) {
      this.#abortController.abort();
      this.#abortController = new AbortController();
    }

    this.#level = new Level({
      eventHandler: this.#eventHandler,
      player: this.#player,
      renderer: this.#renderer,
    });

    this.#level.addEventListener(levelEvents.done, () => this.#createLevel(), {
      signal: this.#abortController.signal,
    });
  }
}
