const generateLink = (...args) => {
  let protocol, baseUrl, paths;

  if (args.length === 2 && Array.isArray(args[1])) {
    baseUrl = args[0];
    paths = args[1];
    return `${baseUrl}/${paths.join("/")}`;
  } else if (args.length === 3 && Array.isArray(args[2])) {
    protocol = args[0];
    baseUrl = args[1];
    paths = args[2];
    return `${protocol}://${baseUrl}/${paths.join("/")}`;
  } else {
    throw new Error(
      "Invalid arguments. Expected (protocol, baseUrl, paths) or (baseUrl, paths)."
    );
  }
};

module.exports = { generateLink };
