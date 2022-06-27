import { userApi } from "./api/user-api.js";
import { waterfallApi } from "./api/waterfall-api.js";
import { imageApi } from "./api/image-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.findAll },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "PUT", path: "/api/users/{id}", config: userApi.update },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/waterfalls", config: waterfallApi.create },
  { method: "GET", path: "/api/waterfalls", config: waterfallApi.findAll },
  { method: "DELETE", path: "/api/waterfalls", config: waterfallApi.deleteAll },
  { method: "DELETE", path: "/api/waterfalls/{id}", config: waterfallApi.deleteOne },
  { method: "GET", path: "/api/waterfalls/{id}", config: waterfallApi.findOne },
  { method: "PUT", path: "/api/waterfalls/{id}", config: waterfallApi.update },

  { method: "POST", path: "/api/images", config: imageApi.upload },
  { method: "GET", path: "/api/images/{waterfallId}", config: imageApi.findAllImagesForWaterfall },
  { method: "DELETE", path: "/api/images", config: imageApi.deleteAll },
  { method: "DELETE", path: "/api/images/{id}", config: imageApi.deleteImage },
  { method: "GET", path: "/upload/{dayHash}/{imageName}", config: imageApi.retrieveImage },
];
