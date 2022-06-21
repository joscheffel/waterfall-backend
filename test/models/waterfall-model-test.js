import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { niagaraFalls, testFalls } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Waterfall Model tests", () => {
  const NO_WATERFALLS = 0;
  const BAD_ID = "62b19f6f1198fa79acfa6418";

  setup(async () => {
    db.init("mongo");
    await db.waterfallStore.deleteAll();
  });

  test("Create a Waterfall", async () => {
    const newWaterfall = await db.waterfallStore.addWaterfall(niagaraFalls);
    assertSubset(niagaraFalls, newWaterfall);
  });

  test("delete all waterfalls", async () => {
    for (let i = 0; i < testFalls.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.waterfallStore.addWaterfall(testFalls[i]);
    }
    let returnedFalls = await db.waterfallStore.getAllWaterfalls();
    assert.equal(returnedFalls.length, testFalls.length);
    await db.waterfallStore.deleteAll();
    returnedFalls = await db.waterfallStore.getAllWaterfalls();
    assert.equal(returnedFalls.length, NO_WATERFALLS);
  });

  test("get a Waterfall - success", async () => {
    const waterfall = await db.waterfallStore.addWaterfall(niagaraFalls);
    const returnedWaterfall = await db.waterfallStore.getWaterfallById(waterfall._id);
    assert.deepEqual(waterfall, returnedWaterfall);
  });

  test("get Waterfalls by userid - success", async () => {
    for (let i = 0; i < testFalls.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.waterfallStore.addWaterfall(testFalls[i]);
    }
    const { userid } = testFalls[0];
    const allWaterfalls = await db.waterfallStore.getAllWaterfalls();
    const userWaterfalls = allWaterfalls.filter((waterfall) => true);
    const returnedWaterfall = await db.waterfallStore.getWaterfallsByUserId(userid);
    assert.deepEqual(returnedWaterfall, userWaterfalls);
  });

  test("delete one waterfall - success", async () => {
    for (let i = 0; i < testFalls.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testFalls[i] = await db.waterfallStore.addWaterfall(testFalls[i]);
    }
    await db.waterfallStore.deleteWaterfallById(testFalls[0]._id);
    const returnedFalls = await db.waterfallStore.getAllWaterfalls();
    assert.equal(returnedFalls.length, testFalls.length - 1);
    const deletedWaterfall = await db.waterfallStore.getWaterfallById(testFalls[0]._id);
    assert.isEmpty(deletedWaterfall);
  });

  test("update one waterfall - success", async () => {
    const waterfall = await db.waterfallStore.addWaterfall(niagaraFalls);
    waterfall.name = "Niagara Fall - Canada";
    const updatedWaterfall = await db.waterfallStore.updateWaterfall(waterfall._id, waterfall);
    assert.deepEqual(updatedWaterfall, waterfall);
  });

  test("get a waterfall = bad params", async () => {
    assert.isEmpty(await db.waterfallStore.getWaterfallById(""));
    assert.isEmpty(await db.waterfallStore.getWaterfallById());
  });

  test("delete one waterfall - bad-id", async () => {
    for (let i = 0; i < testFalls.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.waterfallStore.addWaterfall(testFalls[i]);
    }
    await db.waterfallStore.deleteWaterfallById("bad-id");
    const allWaterfall = await db.waterfallStore.getAllWaterfalls();
    assert.equal(allWaterfall.length, testFalls.length);
  });

  test("update one waterfall - id not equal waterfall object id", async () => {
    const waterfall = await db.waterfallStore.addWaterfall(niagaraFalls);
    waterfall.name = "Niagara Fall - Canada";
    const allWaterfalls = await db.waterfallStore.getAllWaterfalls();
    const updatedWaterfall = await db.waterfallStore.updateWaterfall("bad-id", waterfall);
    const allWaterfallsAfterUpdate = await db.waterfallStore.getAllWaterfalls();
    assert.equal(allWaterfallsAfterUpdate.length, allWaterfalls.length);
    assert.notDeepEqual(updatedWaterfall, waterfall);
    assert.isEmpty(updatedWaterfall);
  });

  test("update one waterfall - bad-id", async () => {
    const waterfall = await db.waterfallStore.addWaterfall(niagaraFalls);
    waterfall.name = "Niagara Fall - Canada";
    waterfall._id = "bad-id";
    const allWaterfalls = await db.waterfallStore.getAllWaterfalls();
    const updatedWaterfall = await db.waterfallStore.updateWaterfall(BAD_ID, waterfall);
    const allWaterfallsAfterUpdate = await db.waterfallStore.getAllWaterfalls();
    assert.equal(allWaterfallsAfterUpdate.length, allWaterfalls.length);
    assert.notDeepEqual(updatedWaterfall, waterfall);
  });
});
