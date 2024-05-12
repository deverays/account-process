import "colors";
import express, { Application, Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./database/dbConnection";

import controller from "./controller";

import * as config from "../config.json";

const date = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;

const app: Application = express();
const router = Router();

controller(router);

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

db().then(() =>
    console.log(
        "=>".green,
        date.red,
        "Connected to the database".white,
        `${"Mongoose"}`.italic.green
    )
);

app.listen(config.server.port, () => {
    console.log(
        "=>".green,
        date.red,
        "Server successfully started on port".white,
        `http://localhost:${config.server.port}/api`.italic.blue
    );
});
