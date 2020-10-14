const { assert } = require("chai");
const store = require("../src/store");

const handleDeleteBookmark = require("../src/bookmarks/handleDeleteBookmark");

describe("delete bookmark", () => {
  let bookmarksCopy;
  beforeEach("copy the bookmarks", () => {
    bookmarksCopy = store.bookmarks.slice();
  });

  afterEach("restore the bookmarks", () => {
    store.bookmarks = bookmarksCopy;
  });
  describe("successful delete", () => {
    it("returns true if id found", () => {
      const deleted = handleDeleteBookmark(
        "04c7679c-0908-11eb-adc1-0242ac120002"
      );
      assert.isTrue(deleted);
    });
    it("removes bookmark from store if found", () => {
      handleDeleteBookmark("04c7679c-0908-11eb-adc1-0242ac120002");
      assert.notIncludeDeepMembers(store.bookmarks, [
        {
          id: "04c7679c-0908-11eb-adc1-0242ac120002",
          title: "Thinkful",
          url: "https://www.thinkful.com",
          description: "Think outside the classroom",
          rating: 5,
        },
      ]);
    });
  });

  it("returns false if no id match found", () => {
    const deleted = handleDeleteBookmark("bad-id");
    assert.isFalse(deleted);
  });
});
