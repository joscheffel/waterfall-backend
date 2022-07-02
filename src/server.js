import Hapi from "@hapi/hapi";
import path from "path";

import { fileURLToPath } from "url";
import Joi from "joi";
import Cookie from "@hapi/cookie";

import dotenv from "dotenv";
import HapiSwagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import jwt from "hapi-auth-jwt2";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { webRoutes } from "./web-routes.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./util/jwt-utils.js";

const swaggerOptions = {
  info: {
    title: "Waterfall API",
    version: "0.4",
  },
};

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  // process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: {
      cors: {
        credentials: true, // boolean - 'Access-Control-Allow-Credentials'
      },
    },
  });

  db.init();
  await server.register(Cookie);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
  server.auth.default("session");

  await server.register([Inert, Vision, { plugin: HapiSwagger, options: swaggerOptions }]);

  await server.register(jwt);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORD,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  server.route(apiRoutes);
  server.route(webRoutes);

  await server.validator(Joi);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
