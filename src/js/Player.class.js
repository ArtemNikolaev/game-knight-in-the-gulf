

export class Player {
    #playerName;
    #keys = new WeakMap();

    constructor(playerName) {
        this.playerName = playerName;
    }

    get name() {
        return this.playerName;
    }

    set key(keyObj) {
        this.#keys.add(keyObj);
    }

    has(key) {
        return this.#keys.has(key);
    }
}
