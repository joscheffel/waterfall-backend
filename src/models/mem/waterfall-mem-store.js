import { v4 } from "uuid";

let waterfalls = [];

export const waterfallMemStore = {
  async getAllWaterfalls() {
    return waterfalls;
  },

  async addWaterfall(waterfall) {
    waterfall._id = v4();
    waterfalls.push(waterfall);
    return waterfall;
  },

  async getWaterfallById(id) {
    return waterfalls.find((waterfall) => waterfall._id === id);
  },

  async deleteWaterfallById(id) {
    const index = waterfalls.findIndex((waterfall) => waterfall._id === id);
    waterfalls.splice(index, 1);
  },

  async deleteAllWaterfalls() {
    waterfalls = [];
  },
};
