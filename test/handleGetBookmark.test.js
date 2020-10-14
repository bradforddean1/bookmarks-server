const { assert } = require("chai");

const handleGetBookmark = require("../src/bookmarks/handleGetBookmark");

describe("get bookmark", () => {
  it("returns bookmark object mathcing id param", () => {
    const bookmark = handleGetBookmark("04c7679c-0908-11eb-adc1-0242ac120002");
    assert.deepInclude(bookmark, {
      id: "04c7679c-0908-11eb-adc1-0242ac120002",
      title: "Thinkful",
      url: "https://www.thinkful.com",
      description: "Think outside the classroom",
      rating: 5,
    });
  });
  it("returns false if no id match found", () => {
    const bookmark = handleGetBookmark("bad-id");
    assert.isFalse(bookmark);
  });
});
