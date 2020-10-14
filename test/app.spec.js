const app = require("../src/app");

describe("valid authorization header with a Bearer API token value required", () => {
  it("retruns 401 if not provided", () => {
    return supertest(app).get("/").expect(401);
  });
  it("retruns 401 if invalid token provided", () => {
    return supertest(app)
      .get("/")
      .set("Authorization", "Bearer Invalid_Token")
      .expect(401);
  });
});

describe("support for CORS and best practice headers in place", () => {
  it("returns Access-Control-Allow-Origin header", () => {
    return supertest(app).get("/").expect("Access-Control-Allow-Origin", "*");
  });
  it("X-Powered-By header is absent", () => {
    return supertest(app)
      .get("/")
      .then((res) => {
        assert.doesNotHaveAnyKeys(res.headers, "x-powered-by");
      });
  });
});
