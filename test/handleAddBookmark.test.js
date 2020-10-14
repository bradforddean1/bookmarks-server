const { assert } = require("chai");
const store = require("../src/store");
const handleAddBookmark = require("../src/bookmarks/handleAddBookmarks");

describe("add bookmark", () => {
  let bookmarksCopy;
  before("copy the bookmarks", () => {
    bookmarksCopy = store.bookmarks.slice();
  });

  after("restore the bookmarks", () => {
    store.bookmarks = bookmarksCopy;
  });

  const newBookmark = handleAddBookmark({
    title: "Amazon",
    url: "https://www.amazon.com",
    description: "Buy stuff",
    rating: 5,
  });

  it("returns bookmark new object with id for new bookmark", () => {
    assert.isDefined(newBookmark.id);
  });
  it("has a bookmark id that matches  uuid v4 format", () => {
    const v4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );

    assert.match(newBookmark.id, v4);
  });
  it("adds new bookmark to bookmarks store", () => {
    assert.includeDeepMembers(store.bookmarks, [
      {
        id: newBookmark.id,
        title: "Amazon",
        url: "https://www.amazon.com",
        description: "Buy stuff",
        rating: 5,
      },
    ]);
  });
});
