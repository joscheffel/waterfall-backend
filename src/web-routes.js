import { accountsController } from "./controllers/accounts-controller.js";

export const webRoutes = [
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
];
