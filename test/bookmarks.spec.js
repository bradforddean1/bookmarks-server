const express = require("express");

const bookmarksRouter = require("../src/bookmarks/bookmarks-router");
let store = require("../src/store");

const app = express();
app.use(bookmarksRouter);

describe("Bookmarks endpoints", () => {
  let bookmarksCopy;
  beforeEach("copy the bookmarks", () => {
    bookmarksCopy = store.bookmarks.slice();
  });

  afterEach("restore the bookmarks", () => {
    store.bookmarks = bookmarksCopy;
  });

  // Write a route handler for the endpoint GET /bookmarks that returns a list of bookmarks
  describe("GET /bookmarks", () => {
    it("returns a list of bookmarks", () => {
      return supertest(app)
        .get("/bookmarks")
        .expect(200)
        .then((res) => {
          assert.isArray(res.body);
          for (bookmark of res.body) {
            assert.hasAllKeys(bookmark, [
              "id",
              "title",
              "url",
              "description",
              "rating",
            ]);
          }
          assert.includeDeepMembers(res.body, store.bookmarks);
        });
    });
  });

  // Write a route handler for the endpoint GET /bookmarks/:id that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid
  describe("GET /bookmarks/:id", () => {
    it("returns bookmark mathing id presented in query params", () => {
      return supertest(app)
        .get("/bookmarks/04c7679c-0908-11eb-adc1-0242ac120002")
        .expect(200)
        .then((res) => {
          assert.isObject(res.body);
          assert.include(res.body, store.bookmarks[0]);
        });
    });
    it("returns 404 if bookmark  not found", () => {
      return supertest(app).get("/bookmarks/does-not-exist").expect(404);
    });
  });

  // Write a route handler for POST /bookmarks that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.
  describe("POST /bookmarks", () => {
    it("returns ok with valid json object provided", () => {
      return supertest(app)
        .post("/bookmarks")
        .send(
          //prettier-ignore
          {
        "title": "Amazon",
        "url": "https://www.amazon.com",
        "description": "Buy stuff",
        "rating": 5,
        }
        )
        .expect(201);
    });
    it("returns 400 if sending invalid json", () => {
      return supertest(app)
        .post("/bookmarks")
        .send(
          //prettier-ignore
          {
        "url": "https://www.amazon.com",
        "description": "Buy stuff",
        "rating": "alpha",
        "invalid": "json",
        }
        )
        .expect(400);
    });
  });

  // Write a route handler for the endpoint DELETE /bookmarks/:id that deletes the bookmark with the given ID.
  describe("DELETE /bookmarks", () => {
    it("returns ok with valid json object provided", () => {
      return supertest(app)
        .delete("/bookmarks/04c7679c-0908-11eb-adc1-0242ac120002")
        .expect(204);
    });
  });
});
