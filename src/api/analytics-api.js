import { db } from "../models/db.js";
import { IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const analyticsApi = {
  listAllUsers: {
    auth: {
      strategy: "jwt",
      scope: "admin",
    },
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const mappedUsers = users.map((user) => {
        user.passwordLength = user.password.length;
        delete user.password;
        delete user.__v;
        user.name = `${user.firstName[0]}. ${user.lastName}`;
        delete user.firstName;
        delete user.lastName;
        if (user.isAdmin) {
          user.scope = "admin";
        } else {
          user.scope = "user";
        }
        delete user.isAdmin;
        return user;
      });
      return h.response(mappedUsers).code(200);
    },
    tags: ["api", "admin"],
    description: "List all users with details information",
    notes: "Returns details of all users for a dashboard view",
  },
  showUserDetails: {
    auth: {
      strategy: "jwt",
      scope: "admin",
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      user.passwordLength = user.password.length;
      delete user.password;
      delete user.__v;
      if (user.isAdmin) {
        user.scope = "admin";
      } else {
        user.scope = "user";
      }
      delete user.isAdmin;
      user.totalNumberOfPictures = 0;

      const usersWaterfalls = await db.waterfallStore.getWaterfallsByUserId(user._id);
      const usersWaterfallsWithAdditionalInformation = usersWaterfalls.map((waterfall) => {
        delete waterfall.userid;
        delete waterfall.__v;
        return waterfall;
      });

      // eslint-disable-next-line no-restricted-syntax
      for (const waterfall of usersWaterfallsWithAdditionalInformation) {
        // eslint-disable-next-line no-await-in-loop
        const waterfallImgs = await db.imageStore.getImagesByWaterfallId(waterfall._id);
        waterfall.numberOfPictures = waterfallImgs.length;
        user.totalNumberOfPictures += waterfall.numberOfPictures;
      }
      user.numberOfWaterfalls = usersWaterfallsWithAdditionalInformation.length;
      user.waterfalls = usersWaterfallsWithAdditionalInformation;
      return h.response(user).code(200);
    },
    tags: ["api", "admin"],
    description: "Show details for User",
    notes: "Returns analytical data object for an user",
    validate: { params: IdSpec, failAction: validationError },
  },
};
