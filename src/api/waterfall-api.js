import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdObjectSpec, WaterfallArray, WaterfallSpec, WaterfallSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const waterfallApi = {
  findAll: {
    auth: {
      strategy: "session",
      scope: ["user", "admin"],
    },
    handler: async function (request, h) {
      try {
        const waterfalls = db.waterfallStore.getAllWaterfalls();
        return waterfalls;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all waterfalls",
    notes: "Returns details of all waterfalls",
    response: { schema: WaterfallArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "session",
      scope: ["user", "admin"],
    },
    handler: async function (request, h) {
      try {
        const waterfall = await db.waterfallStore.getWaterfallById(request.params.id);
        if (Object.keys(waterfall).length === 0) {
          return Boom.notFound("No Waterfall with this id");
        }
        return waterfall;
      } catch (err) {
        return Boom.serverUnavailable("No waterfall with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific waterfall",
    notes: "Returns waterfall details",
    validate: { params: IdObjectSpec, failAction: validationError },
    response: { schema: WaterfallSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "session",
      scope: ["user", "admin"],
    },
    handler: async function (request, h) {
      try {
        const waterfall = await db.waterfallStore.addWaterfall(request.payload);
        if (Object.keys(waterfall).length !== 0) {
          return h.response(waterfall).code(201);
        }
        return Boom.badImplementation("error creating waterfall");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Waterfall",
    notes: "Returns the newly created waterfall",
    validate: { payload: WaterfallSpec, failAction: validationError },
    response: { schema: WaterfallSpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "session",
      scope: ["user", "admin"],
    },
    handler: async function (request, h) {
      try {
        const waterfall = await db.waterfallStore.updateWaterfall(request.params.id, request.payload);
        if (Object.keys(waterfall).length !== 0) {
          return h.response(waterfall).code(200);
        }
        return Boom.notFound("Couldn't find object to update");
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Updates one waterfall",
    notes: "One waterfall gets updated",
    validate: { params: IdObjectSpec, payload: WaterfallSpecPlus, failAction: validationError },
    response: { schema: WaterfallSpecPlus },
  },

  deleteAll: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async function (request, h) {
      try {
        const deletedCount = await db.waterfallStore.deleteAll();
        if (deletedCount > 0) {
          return h.response().code(204);
        }
        return h.response("No Waterfalls were deleted").code(404);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all waterfalls",
    notes: "All waterfalls get removed from the waterfall service",
  },

  deleteOne: {
    auth: {
      strategy: "session",
      scope: ["user", "admin"],
    },
    handler: async function (request, h) {
      try {
        const deletedCount = await db.waterfallStore.deleteWaterfallById(request.params.id);
        if (deletedCount > 0) {
          return h.response().code(204);
        }
        return h.response(`No waterfall with id ${request.params.id} was found to delete`).code(404);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Deletes one waterfall",
    notes: "Specific waterfall is removed from the waterfall service",
    validate: { params: IdObjectSpec, failAction: validationError },
  },
};
