import { userJsonStore } from "./json/user-json-store.js";
import { waterfallJsonStore } from "./json/waterfall-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { userMemStore } from "./mem/user-mem-store.js";
import { waterfallMemStore } from "./mem/waterfall-mem-store.js";
import { connectMongo } from "./mongo/connect.js";
import { waterfallMongoStore } from "./mongo/waterfall-mongo-store.js";

export const db = {
  userStore: null,
  waterfallStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.waterfallStore = waterfallJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.waterfallStore = waterfallMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.waterfallStore = waterfallMemStore;
    }
  },
};
