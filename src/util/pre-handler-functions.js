import Boom from "@hapi/boom";
import { User } from "../models/mongo/user.js";
import { Waterfall } from "../models/mongo/waterfall.js";

export async function verifyUniqueUser(request, h) {
  const user = await User.findOne({ email: request.payload.email }).lean();
  if (user) {
    if (user.email === request.payload.email) {
      throw Boom.badRequest("E-Mail already taken");
    }
  }
  return request;
}

export async function verifyUniqueWaterfall(request, h) {
  const waterfall = await Waterfall.findOne({ name: request.payload.name }).lean();
  if (waterfall) {
    if (waterfall.name === request.payload.name) {
      throw Boom.badRequest("Waterfall name already exists");
    }
  }
  return request;
}

export async function verifyUserWithIdOrAdmin(request, h) {
  if (request.auth.credentials._id === undefined) throw Boom.badRequest("Invalid Id");
  if (request.auth.credentials._id.toString() === request.params.id || request.auth.credentials.isAdmin) {
    return request;
  }
  throw Boom.forbidden("You cannot access this data");
}

export async function verifyOnlyAdminUserCanChangeAdminPrivilege(request, h) {
  if (!request.auth.credentials.isAdmin && request.payload.isAdmin) {
    throw Boom.forbidden("You aren't privileged to change admin status.");
  }
  return request;
}
