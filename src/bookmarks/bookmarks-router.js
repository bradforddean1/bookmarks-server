const bookmarksRouter = require("express").Router();
const parseJson = require("express").json();
const validateRequest = require("./validatePostContent");
const handleAddBookmark = require("./handleAddBookmarks");
const handleGetBookmark = require("./handleGetBookmark");
const handleDeleteBookmark = require("./handleDeleteBookmark");
const { bookmarks } = require("../store");

bookmarksRouter
  .route("/bookmarks")
  .get((req, res) => {
    res.status(200).json(bookmarks);
  })
  .post(parseJson, (req, res) => {
    try {
      validateRequest(req.body);
    } catch (err) {
      return res.status(400).send(err);
    }

    const newBookmark = handleAddBookmark(req.body);
    res.status(201).json(newBookmark);
  });

bookmarksRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    const bookmark = handleGetBookmark(req.params.id);
    if (!bookmark) {
      return res.status(404).send("Bookmark Not Found");
    }
    res.json(bookmark);
  })
  .delete((req, res) => {
    const deleted = handleDeleteBookmark(req.params.id);
    if (!deleted) {
      return res.status(404).send("Bookmark Not Found");
    }
    res.status(204).end();
  });

module.exports = bookmarksRouter;
