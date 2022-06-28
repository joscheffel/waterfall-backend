import { assert } from "chai";
import { waterfallService } from "./waterfall-service.js";
import { maggie, maggieCredentials } from "../fixtures.js";
import { decodeToken } from "../../src/util/jwt-utils.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    await waterfallService.clearAuth();
    maggie.email = new Date().getUTCSeconds() + maggie.email; // to guarantee a unique user
    await waterfallService.createUser(maggie);
    await waterfallService.authenticate(maggie);
    await waterfallService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await waterfallService.createUser(maggie);
    const response = await waterfallService.authenticate(maggie);
    assert.isTrue(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await waterfallService.createUser(maggie);
    maggieCredentials.email = maggie.email;
    const response = await waterfallService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    console.log(userInfo);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    await waterfallService.clearAuth();
    try {
      await waterfallService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });

  afterEach(async () => {
    await waterfallService.deleteAllUsers();
  });
});
