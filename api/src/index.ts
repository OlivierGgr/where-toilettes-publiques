import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToDb from "./infra/db/connect";
import setupRedisConnection from "./infra/redis";
import { handleErrors } from "./middlewares/error";

import toilet from "./domains/toilets/router/toilets";

const app: Express = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(handleErrors);

app.use("/toilets", toilet);
// app.use("/user");

app.get("/", (_req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const start = async () => {
    try {
        const status = { dbReady: false, redisReady: false};

        await connectToDb(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => status.dbReady = true);
        status.redisReady = await setupRedisConnection();

        console.info(status);
    } catch (error) {
        console.error(error);
    }
};

start();
