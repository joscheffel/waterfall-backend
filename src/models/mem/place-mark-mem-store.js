import { v4 } from "uuid";

let placeMarks = [];

export const placeMarkMemStore = {
  async getAllPlaceMarks() {
    return placeMarks;
  },

  async addPlaceMark(placeMark) {
    placeMark._id = v4();
    placeMarks.push(placeMark);
    return placeMark;
  },

  async getPlaceMarkById(id) {
    return placeMarks.find((placeMark) => placeMark._id === id);
  },

  async deletePlaceMarkById(id) {
    const index = placeMarks.findIndex((placeMark) => placeMark._id === id);
    placeMarks.splice(index, 1);
  },

  async deleteAllPlaceMarks() {
    placeMarks = [];
  },
};
