import { assert } from "chai";
import { maggie, testUsers } from "../fixtures.js";
import { waterfallService } from "./waterfall-service.js";
import { assertSubset } from "../test-utils.js";

const users = new Array(testUsers.length);
const NO_USERS = 0;

suite("User Api Tests", () => {
  setup(async () => {
    await waterfallService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await waterfallService.createUser(testUsers[i]);
    }
    await waterfallService.createUser(maggie);
  });

  test("create a user", async () => {
    const newUser = await waterfallService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await waterfallService.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length + 1); // + 1 is maggie
    await waterfallService.deleteAllUsers();
    returnedUsers = await waterfallService.getAllUsers();
    assert.equal(returnedUsers.length, NO_USERS);
  });

  test("get a user", async () => {
    const returnedUser = await waterfallService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await waterfallService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await waterfallService.deleteAllUsers();
    try {
      const returnedUser = await waterfallService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update a waterfall", async () => {
    let peter = maggie;
    peter.firstName = "peter";
    peter.email = "peter@simpson.com";
    peter = await waterfallService.createUser(peter);
    peter.firstName = "pe";
    peter.email = "pe@simpson.com";
    const updatedPeter = await waterfallService.updateUser(peter._id, peter);
    assert.deepEqual(updatedPeter, peter);
  });

  test("update a waterfall - bad-id", async () => {
    let peter = maggie;
    peter.firstName = "peter";
    peter.email = "peter@simpson.com";
    peter = await waterfallService.createUser(peter);
    peter.firstName = "pe";
    peter.email = "pe@simpson.com";

    try {
      const updatedPeter = await waterfallService.updateUser("bad-id", peter);
      assert.fail("Should not return a response");
    } catch (error) {
      console.log(error);
      assert(error.response.data.message === "Cannot find user to update");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});