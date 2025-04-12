import { chooseRandom } from "../config/exports";

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
