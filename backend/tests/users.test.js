const supertest = require("supertest");
const assert = require("node:assert");
const { test, describe, after, beforeEach } = require("node:test");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Session = require("../models/session");
const bcrypt = require("bcrypt");
const { disconnectFromDatabase } = require("../utils/db");

const usersInDB = async () => {
  const users = await User.findAll();
  return users.map((user) => user.toJSON());
};

describe("initially one user at the db", () => {
  beforeEach(async () => {
    await Session.truncate();
    await User.destroy({ truncate: { cascade: true } });
    const user = new User({
      name: "tiina testaaja",
      email: "tiina@testausmaailma.com",
      username: "testuser",
      passwordHash: await bcrypt.hash("test", 10),
    });

    await user.save();
  });

  test("creation succeeds with a proper username", async () => {
    const users = await usersInDB();

    const newUser = {
      name: "tuomo teiskanen",
      email: "tuomo@gmail.com",
      username: "tuomot",
      password: "marjat80",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedUsers = await usersInDB();
    assert.strictEqual(updatedUsers.length, users.length + 1);

    const usernames = updatedUsers.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with a username that is already in use", async () => {
    const users = await usersInDB();

    const newUser = {
      name: "tuomo tiilikainen",
      email: "tuomotiilikainen@gmail.com",
      username: "testuser",
      password: "syksy100",
    };

    const res = await api.post("/api/users").send(newUser).expect(400);
    const errormessage = res.body.error;
    assert(errormessage.includes("username already in use"));

    const updatedUsers = await usersInDB();
    assert.strictEqual(updatedUsers.length, users.length);
  });

  after(() => {
    console.log("done");
    disconnectFromDatabase();
  });
});
