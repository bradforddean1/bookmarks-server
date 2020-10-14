const logger = require("../logger");
const store = require("../store");

function handleDeleteBookmark(id) {
  const deleteIndex = store.bookmarks.findIndex((b) => b.id == id);

  if (deleteIndex === -1) {
    logger.error(`Bookmark with id ${id} not found.`);
    return false;
  }

  store.bookmarks.splice(deleteIndex, 1);
  logger.info(`Bookmark with id ${id} deleted`);
  return true;
}

module.exports = handleDeleteBookmark;
