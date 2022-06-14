import { v4 } from "uuid";

let waterfalls = [];

export const waterfallMemStore = {
  async getAllWaterfalls() {
    return waterfalls;
  },

  async addWaterfall(waterfall) {
    waterfall._id = v4();
    waterfalls.push(waterfall);
    return { ...waterfall };
  },

  async getWaterfallById(id) {
    let w = waterfalls.find((waterfall) => waterfall._id === id);
    if (w === undefined) w = null;
    return { ...w };
  },

  async updateWaterfall(id, updatedWaterfall) {
    if (updatedWaterfall._id !== id) return {};
    const index = waterfalls.findIndex((waterfall) => waterfall._id === id);
    if (index !== -1) waterfalls[index] = updatedWaterfall;
    return { ...waterfalls[index] };
  },

  async deleteWaterfallById(id) {
    const index = waterfalls.findIndex((waterfall) => waterfall._id === id);
    if (index !== -1) waterfalls.splice(index, 1);
  },

  async deleteAll() {
    waterfalls = [];
  },
};
