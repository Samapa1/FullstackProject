const supertest = require("supertest");
const assert = require("node:assert");
const { test } = require("node:test");
const app = require("../app");
const api = supertest(app);

test("there are five books", async () => {
  const response = await api.get("/api/books");

  assert.strictEqual(response.body.length, 5);
});

test("booklist contains The Stranger", async () => {
  const response = await api.get("/api/books");
  const titles = response.body.map((book) => book.title);
  assert(titles.includes("The Stranger"));
});
