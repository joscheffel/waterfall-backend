import { db } from "../models/db.js";
import { UserCredentialsSpec, UserSpec } from "../models/joi-schemas.js";

export const accountsController = {
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      failAction: function (request, h, error) {
        return h.response({ errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      console.log(user);
      await db.userStore.addUser(user);
      return { success: true };
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      failAction: function (request, h, error) {
        return h.response({ errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return { success: false };
      }
      request.cookieAuth.set({ id: user._id });
      return { success: true };
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return { success: true };
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }

    let scope = "user";
    if (user.isAdmin) {
      scope = "admin";
    }

    user.scope = scope;

    return { valid: true, credentials: user };
  },
};
