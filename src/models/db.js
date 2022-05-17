import { userMemStore } from "./mem/user-mem-store.js";
import { placeMarkMemStore } from "./mem/place-mark-mem-store.js";

export const db = {
  userStore: null,
  placeMarkStore: null,

  init() {
    this.userStore = userMemStore;
    this.placeMarkStore = placeMarkMemStore;
  },
};
