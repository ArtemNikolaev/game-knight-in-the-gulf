export const movements = {
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT",
};

export function* colorSchemeGeneratorFunc() {
  const schemes = [
    new Set(["#4186D3", "#FFB440"]),
    new Set(["#F56E8D", "#9CEF6C"]),
    new Set(["#FFB273", "#5CCCCC"]),
    new Set(["#FFCA40", "#3D4BB0"]),
    new Set(["#FFFF73", "#AD66D5"]),
    new Set(["#CD0074", "#9FEE00"]),
  ];

  while (true) {
    yield schemes[Math.floor(Math.random() * schemes.length)];
  }
}
