import { chooseRandom } from "./jsUtils";

const fancyColors = [
  "deeppink",
  "crimson",
  "orangered",
  "slateblue",
  "palevioletred",
  "darkslategray",
  "dodgerblue",
];

const randomFancyColor = () => chooseRandom(fancyColors);

export { randomFancyColor };
