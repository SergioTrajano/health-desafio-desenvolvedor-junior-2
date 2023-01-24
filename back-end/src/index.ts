import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import { connectDb } from "./dbStrategy/postegresStrategy";

import errorHandler from "./middlewares/errorMiddleware";
import { routes } from "./routes";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(routes);
server.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 8080;

async function init() {
    connectDb();
}

init().then(() => {
    server.listen(PORT, () => {
        console.log("Servidor rodando na porta", PORT);
    });
});
