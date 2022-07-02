import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdObjectSpec, UserArray, UserSpec, UserSpecPlus, UserSpecWithOptionalPassword, UserSpecWithoutPassword } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "../util/jwt-utils.js";
import { verifyOnlyAdminUserCanChangeAdminPrivilege, verifyUniqueUser, verifyUserWithIdOrAdmin } from "../util/pre-handler-functions.js";

export const userApi = {
  findAll: {
    auth: {
      strategy: "jwt",
      scope: "admin",
    },
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        const reducedUsers = users.map((user) => {
          delete user.password;
          return user;
        });
        return reducedUsers;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (Object.keys(user).length === 0) {
          return Boom.notFound("No User with this id");
        }
        delete user.password;
        return user;
      } catch (err) {
        return Boom.notFound("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: IdObjectSpec, failAction: validationError },
    response: { schema: UserSpecWithoutPassword, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
      scope: "admin",
    },
    pre: [{ method: verifyUniqueUser }],
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
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    pre: [verifyUserWithIdOrAdmin, verifyOnlyAdminUserCanChangeAdminPrivilege],
    handler: async function (request, h) {
      try {
        if (!request.payload.password) {
          const user = await db.userStore.getUserById(request.params.id);
          request.payload.password = user.password;
        }
        const user = await db.userStore.updateUser(request.params.id, request.payload);
        if (Object.keys(user).length === 0) {
          return Boom.notFound("Cannot find user to update. Check your id and _id for equality");
        }
        delete user.password;
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Updates one user",
    notes: "One user gets updated",
    validate: { params: IdObjectSpec, payload: UserSpecWithOptionalPassword, failAction: validationError },
    response: { schema: UserSpecWithoutPassword },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
      scope: "admin",
    },
    handler: async function (request, h) {
      try {
        const deletedCount = await db.userStore.deleteAll();
        if (deletedCount > 0) {
          return h.response().code(204);
        }
        return h.response("No Users were deleted").code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "All users get removed from the waterfall service",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const deletedCount = await db.userStore.deleteUserById(request.params.id);
        if (deletedCount > 0) {
          return h.response().code(204);
        }
        return h.response(`No user with id ${request.params.id} was found to delete`).code(404);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Deletes one user",
    notes: "Specific user is removed from the waterfall service",
    validate: { params: IdObjectSpec, failAction: validationError },
  },

  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token: token, userid: user._id, isAdmin: user.isAdmin }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
