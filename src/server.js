import Hapi from "@hapi/hapi";
import path from "path";

import { fileURLToPath } from "url";
import Joi from "joi";
import Cookie from "@hapi/cookie";

import dotenv from "dotenv";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { webRoutes } from "./web-routes.js";
import { accountsController } from "./controllers/accounts-controller.js";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  db.init("mongo");
  server.route(apiRoutes);
  server.route(webRoutes);

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

  await server.validator(Joi);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
