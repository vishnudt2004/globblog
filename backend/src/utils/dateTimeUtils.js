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

const getCurrentWeek = () => {
  const now = new Date();

  // Get current day of the week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = now.getDay();

  // Calculate the start of the week (Sunday)
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - dayOfWeek);
  weekStart.setHours(0, 0, 0, 0); // Reset time to start of the day

  // Calculate the end of the week (Saturday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999); // End of the day

  return `${weekStart.toISOString()}_${weekEnd.toISOString()}`;
};

module.exports = { durationToMs, generateExpireTime, getCurrentWeek };
