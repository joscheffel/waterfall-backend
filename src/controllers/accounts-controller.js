import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const accountsController = {
  signup: {
    auth: false,
    handler: async function (request, h) {
      const user = request.payload;
      if (!user.email || !user.password) {
        return Boom.badRequest("User needs email and password");
      }
      await db.userStore.addUser(user);
      return { success: true };
    },
  },

  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return { success: false };
      }
      return { success: true };
    },
  },
};
