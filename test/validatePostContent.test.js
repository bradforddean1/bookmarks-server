const validate = require("../src/bookmarks/validatePostContent");

describe("validates POST /bookmark json", () => {
  it("returns true if valid json passed", () => {
    const valid = {
      title: "Amazon",
      url: "https://www.amazon.com",
      description: "Buy stuff",
      rating: 5,
    };
    assert.isTrue(validate(valid));
  });
  it("returns an error if no title provided", () => {
    const noTitle = {
      url: "https://www.amazon.com",
      description: "Buy stuff",
      rating: 5,
    };
    assert.throws(() => validate(noTitle), "Invalid format");
  });
  it("returns an error if url not provided", () => {
    const noUrl = {
      title: "Amazon",
      description: "Buy stuff",
      rating: 5,
    };
    assert.throws(() => validate(noUrl), "Invalid format");
  });
  it("returns an error if description not provided", () => {
    const noDescript = {
      title: "Amazon",
      url: "https://www.amazon.com",
      rating: 5,
    };
    assert.throws(() => validate(noDescript), "Invalid format");
  });
  it("returns an error if rating not provided", () => {
    const noRating = {
      title: "Amazon",
      url: "https://www.amazon.com",
      description: "Buy stuff",
    };
    assert.throws(() => validate(noRating), "Invalid format");
  });
  it("returns an error if rating is not a number", () => {
    const nonNumRat = {
      title: "Amazon",
      url: "https://www.amazon.com",
      description: "Buy stuff",
      rating: "alpha",
    };
    assert.throws(() => validate(nonNumRat), "Invalid format");
  });
  it("returns an error if unknown params are provided", () => {
    const extraParams = {
      title: "Amazon",
      url: "https://www.amazon.com",
      description: "Buy stuff",
      rating: 5,
      somethingElse: "I don't belong",
    };
    assert.throws(() => validate(extraParams), "Invalid format");
  });
});
