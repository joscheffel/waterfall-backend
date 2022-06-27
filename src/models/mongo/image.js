import Mongoose from "mongoose";

const { Schema } = Mongoose;

const imageSchema = new Schema({
  name: String,
  imagePath: String,
  waterfallId: {
    type: Schema.Types.ObjectId,
    ref: "Waterfall",
  },
});

export const Image = Mongoose.model("Image", imageSchema);
