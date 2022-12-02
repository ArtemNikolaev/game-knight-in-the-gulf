import { Level } from "./Level.class";
import { Player } from "./Player.class";
import { KeyUpHandlerClass } from "./KeyUpHandler.class";
import { movements } from "./utils";
import { Renderer } from "./Renderer.class";

export class Game {
  #count = 0;
  #renderer;
  #level;
  #player = new Player();
  #eventHandler = new KeyUpHandlerClass();

  constructor(canvas) {
    this.#renderer = new Renderer(canvas);

    this.#createKeyBindings();
    this.#createLevel();
    this.#handleKeyBindings();
  }

  #createKeyBindings() {
    const map = new Map();
    map.set("KeyW", movements.up);
    map.set("KeyS", movements.down);
    map.set("KeyA", movements.left);
    map.set("KeyD", movements.right);

    this.#eventHandler.addKeyEvents(map);
  }

  #handleKeyBindings() {
    this.#eventHandler.addEventListener(movements.up, () => this.#level.up());
    this.#eventHandler.addEventListener(movements.down, () =>
      this.#level.down()
    );
    this.#eventHandler.addEventListener(movements.left, () =>
      this.#level.left()
    );
    this.#eventHandler.addEventListener(movements.right, () =>
      this.#level.right()
    );
  }

  #onLevelDone() {
    this.#count++;
    this.#createLevel();
  }

  #createLevel() {
    this.#level = new Level({
      player: this.#player,
      renderer: this.#renderer,
      onDoneCb: () => this.#onLevelDone(),
    });
  }
}
