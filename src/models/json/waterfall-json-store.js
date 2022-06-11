import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/waterfalls.json"));
db.data = { waterfalls: [] };

export const waterfallJsonStore = {
  async getAllWaterfalls() {
    await db.read();
    return db.data.waterfalls;
  },

  async addWaterfall(waterfall) {
    await db.read();
    waterfall._id = v4();
    db.data.waterfalls.push(waterfall);
    await db.write();
    return { ...waterfall };
  },

  async getWaterfallById(id) {
    await db.read();
    let w = db.data.waterfalls.find((waterfall) => waterfall._id === id);
    if (w === undefined) w = null;
    return { ...w };
  },

  async updateWaterfall(id, updatedWaterfall) {
    await db.read();
    if (updatedWaterfall._id !== id) return {};
    const index = db.data.waterfalls.findIndex((waterfall) => waterfall._id === id);
    if (index !== -1) db.data.waterfalls[index] = updatedWaterfall;
    await db.write();
    return { ...db.data.waterfalls[index] };
  },

  async deleteWaterfallById(id) {
    await db.read();
    const index = db.data.waterfalls.findIndex((waterfall) => waterfall._id === id);
    if (index !== -1) db.data.waterfalls.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.waterfalls = [];
    await db.write();
  },
};
