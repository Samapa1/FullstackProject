const supertest = require("supertest");
const assert = require("node:assert");
const { test, after } = require("node:test");
const app = require("../app");
const { disconnectFromDatabase } = require("../utils/db");
const api = supertest(app);

test("there are fifty books", async () => {
  const response = await api.get("/api/books");

  assert.strictEqual(response.body.length, 50);
});

test("booklist contains The Stranger", async () => {
  const response = await api.get("/api/books");
  const titles = response.body.map((book) => book.title);
  assert(titles.includes("The Stranger"));
});

after(() => {
  disconnectFromDatabase();
});
