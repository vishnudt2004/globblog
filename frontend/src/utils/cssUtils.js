const setOverflowY = (condition) => {
  document.documentElement.style.overflowY = condition ? "hidden" : "auto";
};

const getCssVarValue = (
  variableName,
  from = "body" // body | :root | root
) => {
  const element = from === "body" ? document.body : document.documentElement;
  const computedStyle = window.getComputedStyle(element);
  const value = computedStyle.getPropertyValue(variableName);

  return value.trim();
};

const cssUnitExtractor = (input) => {
  const match = input.match(/^(\d+)([a-zA-Z%]+)$/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2],
    };
  } else {
    return null;
  }
};

const colorMix = (color1, color2, unit) =>
  `color-mix(in srgb, ${color1}, ${color2} ${unit})`;

const checkFAIconLoaded = (iconElement) => {
  const computedStyle = window.getComputedStyle(iconElement, "::before");
  const content = computedStyle.getPropertyValue("content");
  return content && content !== "none";
};

const multipleMediaQueries = (breakpointsArray, style) => {
  const queries = [];
  if (breakpointsArray.length > 0) {
    breakpointsArray.forEach((bp) => {
      queries.push(`@media screen and ${bp} { ${style} }`);
    });

    return queries.join("\n");
  } else return;
};

export {
  setOverflowY,
  getCssVarValue,
  cssUnitExtractor,
  colorMix,
  checkFAIconLoaded,
  multipleMediaQueries,
};
