import { Image } from "./image.js";

export const imageMongoStore = {
  async addImage(image) {
    const newImage = new Image(image);
    const imageObj = await newImage.save();
    const i = await this.getImageById(imageObj._id);
    return i;
  },

  async getImageById(id) {
    if (id) {
      let image = await Image.findOne({ _id: id }).lean();
      if (image === null) image = {};
      return image;
    }
    return {};
  },

  async getImagesByWaterfallId(id) {
    if (id) {
      let image = await Image.find({ waterfallId: id });
      if (image === null) image = [];
      return image;
    }
    return [];
  },

  async getAllImages() {
    const images = await Image.find({});
    return images;
  },

  async deleteImageById(id) {
    try {
      const data = await Image.deleteOne({ _id: id });
      return data.deletedCount;
    } catch (error) {
      console.log("bad id");
      return 0;
    }
  },

  async deleteAll() {
    const data = await Image.deleteMany({});
    return data.deletedCount;
  },
};
