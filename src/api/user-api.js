import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdObjectSpec, IdSpec, UserArray, UserSpec, UserSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const userApi = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (Object.keys(user).length === 0) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.notFound("No User with this id");
      }
    },
    validate: { params: IdObjectSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    validate: { payload: UserSpec, failAction: validationError },
  },

  update: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.updateUser(request.params.id, request.payload);
        if (Object.keys(user).length === 0) {
          return Boom.notFound("Cannot find user to update");
        }
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    validate: { params: IdObjectSpec, payload: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.userStore.deleteUserById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
  },
};
