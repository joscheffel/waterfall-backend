import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { mockImageObject, testImages } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Image Model tests", () => {
  const NO_IMAGE = 0;
  const ONE_REMOVAL = 1;
  const BAD_ID = "62b19f6f1198fa79acfa6418";

  setup(async () => {
    db.init();
    await db.imageStore.deleteAll();
  });

  test("Create a image", async () => {
    const newImage = await db.imageStore.addImage(mockImageObject);
    assertSubset(mockImageObject, newImage);
  });

  test("delete all images", async () => {
    for (let i = 0; i < testImages.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.imageStore.addImage(testImages[i]);
    }
    let returnedImages = await db.imageStore.getAllImages();
    assert.equal(returnedImages.length, testImages.length);
    await db.imageStore.deleteAll();
    returnedImages = await db.imageStore.getAllImages();
    assert.equal(returnedImages.length, NO_IMAGE);
  });

  test("Get image by id", async () => {
    const image = await db.imageStore.addImage(mockImageObject);
    for (let i = 0; i < testImages.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.imageStore.addImage(testImages[i]);
    }
    const returnedImage1 = await db.imageStore.getImageById(image._id);
    assert.deepEqual(returnedImage1, image);
    const returnedImage2 = await db.imageStore.getImageById(image._id);
    assert.deepEqual(returnedImage2, image);
  });

  test("Get images by waterfallId", async () => {
    const image = await db.imageStore.addImage(mockImageObject);
    for (let i = 0; i < testImages.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.imageStore.addImage(testImages[i]);
    }
    const { waterfallId } = testImages[0];
    const imagesInDb = await db.imageStore.getAllImages();
    const imagesByWaterfallIdExpected = imagesInDb.filter((img) => img.waterfallId.toString() === waterfallId);
    const imagesByWaterfallIdActual = await db.imageStore.getImagesByWaterfallId(waterfallId);
    assertSubset(imagesByWaterfallIdActual, imagesByWaterfallIdExpected);
  });

  test("delete image by id", async () => {
    const image = await db.imageStore.addImage(mockImageObject);
    for (let i = 0; i < testImages.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.imageStore.addImage(testImages[i]);
    }
    const numBeforeRemoval = (await db.imageStore.getAllImages()).length;
    const removeCount = await db.imageStore.deleteImageById(image._id);
    const numAfterRemoval = (await db.imageStore.getAllImages()).length;
    assert.equal(removeCount, ONE_REMOVAL);
    assert.equal(numAfterRemoval, numBeforeRemoval - ONE_REMOVAL);
  });

  test("delete all", async () => {
    const image = await db.imageStore.addImage(mockImageObject);
    for (let i = 0; i < testImages.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.imageStore.addImage(testImages[i]);
    }
    const numBeforeRemoval = (await db.imageStore.getAllImages()).length;
    const removeCount = await db.imageStore.deleteAll();
    const numAfterRemoval = (await db.imageStore.getAllImages()).length;
    assert.equal(removeCount, numBeforeRemoval);
    assert.equal(numAfterRemoval, NO_IMAGE);
  });
});
