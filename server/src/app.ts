import "colors";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./database/dbConnection";
import express, { Application, Router } from "express";
import multer from "multer";

import controller, { cdnController } from "./controller/index";

import * as config from "../config.json";

const date = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;

const app: Application = express();
const multerParse = multer({
    dest: "uploads/",
});
const router = Router();
const cdnRouter = Router();

controller(router);
cdnController(cdnRouter, multerParse);

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);
app.use("/cdn", cdnRouter);

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
