import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User Model tests", () => {
  const NO_USER = 0;
  const BAD_ID = "62b19f6f1198fa79acfa6418";

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assertSubset(maggie, newUser);
  });

  test("delete all users", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, NO_USER);
  });

  test("get a user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("delete One User - success", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
    await db.userStore.deleteUserById(testUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    assert.isEmpty(deletedUser);
  });

  test("update one user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    user.firstName = "Ma";
    user.email = "ma@simpson.com";
    const updatedUser = await db.userStore.updateUser(user._id, user);
    assert.deepEqual(updatedUser, user);
    const updatedUserInDb = await db.userStore.getUserById(user._id);
    assert.deepEqual(updatedUserInDb, user);
  });

  test("get a user - failures", async () => {
    const noUserWithId = await db.userStore.getUserById();
    assert.isEmpty(noUserWithId);
    const noUserWithEmail = await db.userStore.getUserByEmail("no@one.com");
    assert.isEmpty(noUserWithEmail);
  });

  test("get a user - bad params", async () => {
    assert.isEmpty(await db.userStore.getUserByEmail(""));
    assert.isEmpty(await db.userStore.getUserById(""));
    assert.isEmpty(await db.userStore.getUserById());
  });

  test("delete One User - fail", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(testUsers.length, allUsers.length);
  });

  test("update one user - bad-id", async () => {
    const user = await db.userStore.addUser(maggie);
    user.firstName = "Ma";
    user.email = "ma@simpson.com";
    user._id = "bad-id";
    const allUsers = await db.userStore.getAllUsers();
    const updatedUser = await db.userStore.updateUser(BAD_ID, user);
    const allUsersAfterUpdate = await db.userStore.getAllUsers();
    assert.equal(allUsersAfterUpdate.length, allUsers.length);
    assert.notDeepEqual(updatedUser, user);
  });
});
