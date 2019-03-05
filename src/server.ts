import App from "./app";
import ItemController from "./controllers/item.controller";

const app = new App([new ItemController()], 8080);

app.listen();
