import { Level } from "./Level.class";
import { Player } from "./Player.class";
import { KeyUpHandlerClass } from "./KeyUpHandler.class";
import { levelEvents, movements } from "./utils";

export class Game {
  #ctx;
  #level;
  #player = new Player();
  #eventHandler = new KeyUpHandlerClass();

  constructor(ctx) {
    this.#ctx = ctx;
    this.#createLevel(ctx);

    this.#createKeyBindings();
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
    this.#level = new Level({
      context: this.#ctx,
      eventHandler: this.#eventHandler,
      player: this.#player,
    });

    this.#level.addEventListener(levelEvents.done, () => this.#createLevel());
  }
}
