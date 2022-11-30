export class Player {
  #keys = new WeakSet();

  set key(keyObj) {
    this.#keys.add(keyObj);
  }

  has(key) {
    return this.#keys.has(key);
  }
}
