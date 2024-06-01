import "colors";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import controller from "./controller";
import db from "./utils/database/dbConnection";
import { server } from "../config.json";

const app = express();
const { port } = server;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", controller);

db().then(() => console.log(`${"=>".green} ${new Date().toLocaleTimeString().red} Connected to the database ${"Mongoose".italic.green}`)).catch(() => { });

const serverInstance = app.listen(port, () => console.log(`${"=>".green} ${new Date().toLocaleTimeString().red} Server started on port ${`http://localhost:${port}/api`.italic.blue}`));

process.on("SIGINT", () => {
    console.log("Server is shutting down...".red);
    serverInstance.close(() => {
        console.log("Server closed".green);
        process.exit(0);
    });
});
