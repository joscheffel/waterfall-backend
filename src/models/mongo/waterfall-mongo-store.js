import { Waterfall } from "./waterfall.js";

export const waterfallMongoStore = {
  async getAllWaterfalls() {
    const waterfalls = await Waterfall.find().lean();
    return waterfalls;
  },

  async addWaterfall(waterfall) {
    const newWaterfall = new Waterfall(waterfall);
    const waterfallObj = await newWaterfall.save();
    const w = await this.getWaterfallById(waterfallObj._id);
    return w;
  },

  async getWaterfallById(id) {
    if (id) {
      let waterfall = await Waterfall.findOne({ _id: id }).lean();
      if (waterfall === null) waterfall = {};
      return waterfall;
    }
    return {};
  },

  async getWaterfallsByUserId(userid) {
    if (userid) {
      let waterfalls = await Waterfall.find({ userid: userid }).lean();
      if (waterfalls === null) waterfalls = [];
      return waterfalls;
    }
    return [];
  },

  async updateWaterfall(id, updatedWaterfall) {
    if (id === updatedWaterfall._id) {
      await Waterfall.updateOne({ _id: id }, updatedWaterfall);
      const w = await this.getWaterfallById(id);
      return w;
    }
    return {};
  },

  async deleteWaterfallById(id) {
    try {
      await Waterfall.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Waterfall.deleteMany({});
  },
};
