const replacePlaceholders = async (text, replacements) => {
  for (let placeholder in replacements) {
    if (replacements.hasOwnProperty(placeholder)) {
      const regex = new RegExp(escapeRegExp(placeholder), "g");
      text = text.replace(regex, replacements[placeholder]);
    }
  }
  return text;
};

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string

const encodeBase64 = (str) => Buffer.from(str).toString("base64");

const decodeBase64 = (base64) =>
  Buffer.from(base64, "base64").toString("utf-8");

module.exports = {
  replacePlaceholders,
  escapeRegExp,
  encodeBase64,
  decodeBase64,
};
