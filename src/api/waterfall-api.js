import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const waterfall = await db.waterfallStore.getWaterfallById(request.params.id);
        if (!waterfall) {
          return Boom.notFound("No Waterfall with this id");
        }
        return waterfall;
      } catch (err) {
        return Boom.serverUnavailable("No waterfall with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        if (!request.payload.name) {
          return Boom.badRequest("Waterfall needs a name", request.payload.name);
        }
        const waterfall = await db.waterfallStore.addWaterfall(request.payload);
        if (waterfall) {
          return h.response(waterfall).code(201);
        }
        return Boom.badImplementation("error creating waterfall");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  update: {
    auth: false,
    handler: async function (request, h) {
      try {
        if (!request.params.id || !request.payload.name) {
          return Boom.badRequest("Updating a waterfall needs a waterfall id and name");
        }
        const waterfall = await db.waterfallStore.updateWaterfall(request.params.id, request.payload);
        if (waterfall) {
          return h.response(waterfall).code(200);
        }
        return Boom.badImplementation("Error updating waterfall");
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.waterfallStore.deleteAllWaterfalls();
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
