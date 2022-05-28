import { userMemStore } from "./mem/user-mem-store.js";
import { waterfallMemStore } from "./mem/waterfall-mem-store.js";

export const db = {
  userStore: null,
  waterfallStore: null,

  init() {
    this.userStore = userMemStore;
    this.waterfallStore = waterfallMemStore;
  },
};
