export class KeyUpHandlerClass extends EventTarget {
  #keyEventMapping = new Map();

  constructor() {
    super();

    window.addEventListener("keyup", (event) => {
      if (!this.#keyEventMapping.has(event.code)) return;

      event.preventDefault();
      const set = this.#keyEventMapping.get(event.code);

      for (let eventName of set) {
        this.dispatchEvent(new Event(eventName));
      }
    });
  }

  addKeyEvents(map) {
    for (let [key, eventName] of map) {
      const set = this.#keyEventMapping.has(key) ? map.get(key) : new Set();
      set.add(eventName);

      this.#keyEventMapping.set(key, set);
    }
  }
}
