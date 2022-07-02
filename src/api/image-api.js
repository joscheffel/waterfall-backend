import Boom from "@hapi/boom";
import { deleteAllFiles, deleteFile, handleFileUpload } from "../util/image-utils.js";
import { db } from "../models/db.js";
import { IdSpec, ImageArray, ImageObjectParams, ImageSpec, ImageSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const imageApi = {
  upload: {
    auth: {
      strategy: "jwt",
    },
    payload: {
      maxBytes: 209715200,
      output: "stream",
      parse: true,
      multipart: true,
    },
    handler: async function (request, h) {
      const { filepath } = await handleFileUpload(request.payload.file);
      const image = {
        name: request.payload.name,
        waterfallId: request.payload.waterfallId,
        imagePath: filepath,
      };
      const i = await db.imageStore.addImage(image);
      return i;
    },
    tags: ["api"],
    description: "Upload an image",
    notes: "Stores uploaded image at server",
    validate: { payload: ImageSpec, failAction: validationError },
    response: { schema: ImageSpecPlus, failAction: validationError },
  },

  findAllImagesForWaterfall: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const images = await db.imageStore.getImagesByWaterfallId(request.params.waterfallId);
        return images;
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Returns all images for a waterfall",
    validate: { params: IdSpec, failAction: validationError },
  },

  retrieveImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      return h.file(`./upload/${request.params.dayHash}/${request.params.imageName}`);
    },
    tags: ["api"],
    description: "Get image data",
    notes: "Returns the image data",
    validate: { params: ImageObjectParams, failAction: validationError },
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
      scope: "admin",
    },
    handler: async function (request, h) {
      const image = await db.imageStore.getImageById(request.params.id);
      const { imagePath } = image;
      if (Object.keys(image).length === 0) {
        return Boom.notFound("No Image found with this id.");
      }
      await db.imageStore.deleteImageById(request.params.id);
      deleteFile(imagePath);
      return h.response().code(204);
    },
    tags: ["api"],
    description: "Deletes an image",
    notes: "Deletes the image with the provided id",
    validate: { params: IdSpec, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
      scope: "admin",
    },
    handler: async function (request, h) {
      let deletedCount = null;
      try {
        deletedCount = await db.imageStore.deleteAll();
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }

      deleteAllFiles();

      if (deletedCount > 0) {
        return h.response().code(204);
      }
      return h.response("No Images were deleted").code(204);
    },
    tags: ["api"],
    description: "Deletes all images",
    notes: "Deletes all images stored at the server",
  },
};
