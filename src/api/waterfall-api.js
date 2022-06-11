import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdObjectSpec, WaterfallArray, WaterfallSpec, WaterfallSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const waterfallApi = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        const waterfalls = db.waterfallStore.getAllWaterfalls();
        return waterfalls;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    response: { schema: WaterfallArray, failAction: validationError },
  },

  findOne: {
    auth: false,
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
    validate: { params: IdObjectSpec, failAction: validationError },
    response: { schema: WaterfallSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
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
    validate: { payload: WaterfallSpec, failAction: validationError },
    response: { schema: WaterfallSpecPlus, failAction: validationError },
  },

  update: {
    auth: false,
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
    validate: { params: IdObjectSpec, payload: WaterfallSpecPlus, failAction: validationError },
    response: { schema: WaterfallSpecPlus },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.waterfallStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.waterfallStore.deleteWaterfallById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
