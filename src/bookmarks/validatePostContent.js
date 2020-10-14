function validatePostContent(body) {
  const provided = Object.keys(body);
  const expected = ["title", "url", "description", "rating"];

  for (param of expected) {
    if (!provided.includes(param)) {
      throw new Error("Invalid format");
    }
    if (!body[param]) {
      throw new Error("Invalid format");
    }
    provided.shift();
  }

  if (provided.length > 0) {
    throw new Error("Invalid format");
  }

  if (isNaN(parseInt(body.rating))) {
    throw new Error("Invalid format");
  }

  return true;
}

module.exports = validatePostContent;
