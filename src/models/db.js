import { userJsonStore } from "./json/user-json-store.js";
import { waterfallJsonStore } from "./json/waterfall-json-store.js";

export const db = {
  userStore: null,
  waterfallStore: null,

  init() {
    this.userStore = userJsonStore;
    this.waterfallStore = waterfallJsonStore;
  },
};
