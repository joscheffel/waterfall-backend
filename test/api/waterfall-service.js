import { serviceUrl } from "../fixtures.js";
import axios from "axios";

export const waterfallService = {
  waterfallUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.waterfallUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.waterfallUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.waterfallUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.waterfallUrl}/api/users`);
    return res.data;
  },

  async updateUser(id, updatedUser) {
    const res = await axios.put(`${this.waterfallUrl}/api/users/${id}`, updatedUser);
    return res.data;
  },

  async createWaterfall(waterfall) {
    const res = await axios.post(`${this.waterfallUrl}/api/waterfalls`, waterfall);
    return res.data;
  },

  async getWaterfall(id) {
    const res = await axios.get(`${this.waterfallUrl}/api/waterfalls/${id}`);
    return res.data;
  },

  async getAllWaterfalls() {
    const res = await axios.get(`${this.waterfallUrl}/api/waterfalls`);
    return res.data;
  },

  async deleteWaterfall(id) {
    const res = await axios.delete(`${this.waterfallUrl}/api/waterfalls/${id}`);
    return res.data;
  },

  async deleteAllWaterfalls() {
    const res = await axios.delete(`${this.waterfallUrl}/api/waterfalls`);
    return res.data;
  },

  async updateWaterfall(id, updatedWaterfall) {
    const res = await axios.put(`${this.waterfallUrl}/api/waterfalls/${id}`, updatedWaterfall);
    return res.data;
  },
};
