import { cleanEnv, port } from "envalid";

// TODO: add other stuff

export const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port()
  });
};
