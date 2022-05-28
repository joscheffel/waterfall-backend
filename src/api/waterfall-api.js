import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const waterfallApi = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        const waterfalls = db.placeMarkStore.getAllPlaceMarks();
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
        const waterfall = await db.placeMarkStore.getPlaceMarkById(request.params.id);
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
        const waterfall = await db.placeMarkStore.addPlaceMark(request.payload);
        if (waterfall) {
          return h.response(waterfall).code(201);
        }
        return Boom.badImplementation("error creating waterfall");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.placeMarkStore.deleteAllPlaceMarks();
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
        await db.placeMarkStore.deletePlaceMarkById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
