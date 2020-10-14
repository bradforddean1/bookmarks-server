const logger = require("../logger");
const { bookmarks } = require("../store");

function handleGetBookmark(id) {
  const bookmark = bookmarks.find((b) => b.id == id);
  if (!bookmark) {
    logger.error(`Bookmark with id ${id} not found.`);
    return false;
  }
  return bookmark;
}

module.exports = handleGetBookmark;
