import { userMongoStore } from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { waterfallMongoStore } from "./mongo/waterfall-mongo-store.js";
import { imageMongoStore } from "./mongo/image-mongo-store.js";

export const db = {
  userStore: null,
  waterfallStore: null,
  imageStore: null,

  init() {
    this.userStore = userMongoStore;
    this.waterfallStore = waterfallMongoStore;
    this.imageStore = imageMongoStore;
    connectMongo();
  },
};
