import "dotenv/config";
import { createConnection } from "typeorm";
import App from "./app";
import AccountController from "./controllers/AccountController";
import ItemLocationController from "./controllers/Item/ItemLocationController";
import ItemController from "./controllers/ItemController";
import UserController from "./controllers/UserController";
import { validateEnv } from "./utils/validateEnv";

async function main() {
  validateEnv();

  const { port } = process.env;

  const app = new App(
    [
      new ItemController(),
      new ItemLocationController(),
      new UserController(),
      new AccountController()
    ],
    Number(port)
  );

  await createConnection();

  app.listen();
}

main();
