import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      let user = await User.findOne({ _id: id }).lean();
      if (user === null) user = {};
      return user;
    }
    return {};
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    let user = await User.findOne({ email: email }).lean();
    if (user === null) user = {};
    return user;
  },

  async updateUser(id, updatedUser) {
    if (id === updatedUser._id) {
      await User.updateOne({ _id: id }, updatedUser);
      const u = await this.getUserById(id);
      return u;
    }
    return {};
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
