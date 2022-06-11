import { assert } from "chai";
import { niagaraFalls, testFalls } from "../fixtures.js";
import { waterfallService } from "./waterfall-service.js";
import { assertSubset } from "../test-utils.js";

const waterfalls = new Array(testFalls.length);
const NO_WATERFALLS = 0;

suite("Waterfall Api Tests", () => {
  setup(async () => {
    await waterfallService.deleteAllWaterfalls();
    for (let i = 0; i < testFalls.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      waterfalls[i] = await waterfallService.createWaterfall(testFalls[i]);
    }
    await waterfallService.createWaterfall(niagaraFalls);
  });

  test("create a waterfall", async () => {
    const newWaterfall = await waterfallService.createWaterfall(niagaraFalls);
    assertSubset(niagaraFalls, newWaterfall);
    assert.isDefined(newWaterfall._id);
  });

  test("delete all waterfalls", async () => {
    let returnedFalls = await waterfallService.getAllWaterfalls();
    assert.equal(returnedFalls.length, testFalls.length + 1); // + 1 is niagaraFalls
    await waterfallService.deleteAllWaterfalls();
    returnedFalls = await waterfallService.getAllWaterfalls();
    assert.equal(returnedFalls.length, NO_WATERFALLS);
  });

  test("get a waterfall", async () => {
    const returnedFall = await waterfallService.getWaterfall(waterfalls[0]._id);
    assert.deepEqual(waterfalls[0], returnedFall);
  });

  test("get a waterfall - bad id", async () => {
    try {
      const returnedFall = await waterfallService.getWaterfall("1234");
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