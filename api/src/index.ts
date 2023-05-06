import connectToDb from "./db/connect";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
const toilet = require("./routes/toilets");

const app: Express = express();
const port = 3001;
dotenv.config();

const handleErrors = (err: any, _: Request, res: Response, next: any) => {
    res.status(500).json({
        message: err.message,
        success: false,
    });
};

app.use(cors());
app.use(handleErrors);
app.use(express.json());
app.use("/toilets", toilet);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const start = async () => {
    try {
        await connectToDb(process.env.MONGO_URI);
        app.listen(port);
    } catch (error) {
        console.error(error);
    }
};

start();
