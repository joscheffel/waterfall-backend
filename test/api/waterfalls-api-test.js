import { assert } from "chai";
import { maggie, maggieCredentials, niagaraFalls, testFalls } from "../fixtures.js";
import { waterfallService } from "./waterfall-service.js";
import { assertSubset } from "../test-utils.js";

const waterfalls = new Array(testFalls.length);
const NO_WATERFALLS = 0;
const BAD_ID = "62b19f6f1198fa79acfa6418";

suite("Waterfall Api Tests", () => {
  let user = null;
  setup(async () => {
    maggie.email = new Date().getUTCSeconds() + maggie.email; // to guarantee a unique user
    user = await waterfallService.createUser(maggie);
    await waterfallService.authenticate(user);
    await waterfallService.deleteAllWaterfalls();
    await waterfallService.deleteAllUsers();
    user = await waterfallService.createUser(maggie);
    await waterfallService.authenticate(user);
    niagaraFalls.userid = user._id;
  });

  test("create a waterfall", async () => {
    const newWaterfall = await waterfallService.createWaterfall(niagaraFalls);
    assertSubset(niagaraFalls, newWaterfall);
    assert.isDefined(newWaterfall._id);
  });

  test("create a waterfall - fail missing required field location", async () => {
    const niagaraFallsWithoutLocation = {};
    niagaraFallsWithoutLocation.name = "Falls without location";
    try {
      const newWaterfall = await waterfallService.createWaterfall(niagaraFallsWithoutLocation);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === '"location" is required');
      assert.equal(error.response.data.statusCode, 400);
    }
  });

  test("delete all waterfalls", async () => {
    for (let i = 0; i < testFalls.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await waterfallService.createWaterfall(testFalls[i]);
    }
    let returnedFalls = await waterfallService.getAllWaterfalls();
    assert.equal(returnedFalls.length, testFalls.length);
    await waterfallService.deleteAllWaterfalls();
    returnedFalls = await waterfallService.getAllWaterfalls();
    assert.equal(returnedFalls.length, NO_WATERFALLS);
  });

  test("get a waterfall", async () => {
    for (let i = 0; i < testFalls.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      waterfalls[i] = await waterfallService.createWaterfall(testFalls[i]);
    }
    const returnedFall = await waterfallService.getWaterfall(waterfalls[0]._id);
    assert.deepEqual(waterfalls[0], returnedFall);
  });

  test("get a waterfall - bad id", async () => {
    try {
      const returnedFall = await waterfallService.getWaterfall(BAD_ID);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Waterfall with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a waterfall - deleted waterfall", async () => {
    await waterfallService.deleteAllWaterfalls();
    try {
      const returnedFall = await waterfallService.getWaterfall(waterfalls[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Waterfall with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update a waterfall", async () => {
    let canadianNiagaraFalls = niagaraFalls;
    canadianNiagaraFalls.name = "niagara fall - canada";
    canadianNiagaraFalls = await waterfallService.createWaterfall(canadianNiagaraFalls);
    canadianNiagaraFalls.name = "Niagara Falls - Canada";
    const updatedFalls = await waterfallService.updateWaterfall(canadianNiagaraFalls._id, canadianNiagaraFalls);

    assert.deepEqual(updatedFalls, canadianNiagaraFalls);
  });

  test("update a waterfall - bad-id", async () => {
    let canadianNiagaraFalls = niagaraFalls;
    canadianNiagaraFalls.name = "niagara fall - canada";
    canadianNiagaraFalls = await waterfallService.createWaterfall(canadianNiagaraFalls);
    canadianNiagaraFalls.name = "Niagara Falls - Canada";
    try {
      const updatedFalls = await waterfallService.updateWaterfall("1234", canadianNiagaraFalls);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "Couldn't find object to update");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
