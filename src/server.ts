import { createConnection } from "typeorm";
import App from "./app";
import ItemController from "./controllers/ItemController";
import UserController from "./controllers/UserController";

async function main() {
  const app = new App([new ItemController(), new UserController()], 8080);

  await createConnection();

  app.listen();
}

main();
