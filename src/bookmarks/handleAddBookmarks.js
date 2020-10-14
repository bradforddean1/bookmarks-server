const { v4: uuid } = require("uuid");
const logger = require("../logger");
const store = require("../store");

function handleAddBookmark(body) {
  const { title, url, description, rating } = body;
  const newBookmark = { id: uuid(), title, url, description, rating };
  store.bookmarks.push(newBookmark);
  logger.info(`Bookmark with id ${newBookmark.id} created`);
  return newBookmark;
}

module.exports = handleAddBookmark;
