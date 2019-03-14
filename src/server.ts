import "dotenv/config";
import { createConnection } from "typeorm";
import App from "./app";
import AccountController from "./controllers/AccountController";
import ItemAmountController from "./controllers/item/ItemAmountController";
import ItemCategoryController from "./controllers/item/ItemCategoryController";
import ItemController from "./controllers/item/ItemController";
import ItemLocationController from "./controllers/item/ItemLocationController";
import UserController from "./controllers/UserController";
import { validateEnv } from "./utils/validateEnv";

async function main() {
  validateEnv();

  const { port } = process.env;

  const app = new App(
    [
      new ItemController(),
      new ItemLocationController(),
      new ItemCategoryController(),
      new ItemAmountController(),
      new UserController(),
      new AccountController()
    ],
    Number(port)
  );

  await createConnection();

  app.listen();
}

main();
