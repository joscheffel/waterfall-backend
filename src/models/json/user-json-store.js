import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/users.json"));
db.data = { users: [] };

export const userJsonStore = {
  async getAllUsers() {
    console.log("userJsonStore");
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return { ...u };
  },

  async getUserByEmail(email) {
    await db.read();
    let u = db.data.users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return { ...u };
  },

  async updateUser(id, updatedUser) {
    await db.read();
    if (updatedUser._id !== id) return {};
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users[index] = updatedUser;
    await db.write();
    return { ...db.data.users[index] };
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
