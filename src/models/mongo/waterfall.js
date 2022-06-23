import Mongoose from "mongoose";

const { Schema } = Mongoose;

const waterfallSchema = new Schema({
  name: String,
  location: {
    lat: Number,
    long: Number,
  },
  description: String,
  categories: {
    continent: String,
    size: String,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Waterfall = Mongoose.model("waterfall", waterfallSchema);
