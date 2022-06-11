import Hapi from "@hapi/hapi";
import path from "path";

import { fileURLToPath } from "url";
import Joi from "joi";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { webRoutes } from "./web-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  db.init();
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
