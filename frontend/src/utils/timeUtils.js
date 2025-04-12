const durationToMs = (durationString) => {
  const trimmedStr = String(durationString).replace(/^(\d+)(.).*$/, "$1$2");

  const num = parseInt(trimmedStr);

  switch (trimmedStr.slice(-1)) {
    case "s": // seconds
      return 1000 * num;
    case "m": // minutes
      return 1000 * 60 * num;
    case "h": // hours
      return 1000 * 60 * 60 * num;
    case "d": // days
      return 1000 * 60 * 60 * 24 * num;
    case "w": // weeks
      return 1000 * 60 * 60 * 24 * 7 * num;
    case "M": // months
      return 1000 * 60 * 60 * 24 * 7 * 4 * num;
    default: // days
      return 1000 * 60 * 60 * 24 * num;
  }
};

const generateExpireTime = async (expireTime) =>
  new Date(Date.now() + durationToMs(expireTime));

export { durationToMs, generateExpireTime };
