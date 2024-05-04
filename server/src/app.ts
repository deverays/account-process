import "colors";

import Cloud from "./services/cloudServices";
import Server from "./services/serverServices";

import controller from "./controller";

import * as config from "../config.json";

const server = new Server(config.api);

//mongodb+srv://cluster:B100dy50@e-s.j5kucze.mongodb.net/
const cloud = new Cloud({
    connectionUrl: config.cloud.connectionUrl,
    connectionType: config.cloud.connectionType as any,
});

cloud.join();
server.api.installation();

const date = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;

server.onceAsync("installation").then(([status]) => {
    if (status) {
        controller(server.router);
        console.log(
            "=>".green,
            date.red,
            "Server successfully started on port".white,
            `http://localhost:${config.api.port}/api`.italic.blue
        );
    }
});

cloud.onceAsync("join").then(([status]) => {
    if (status)
        console.log(
            "=>".green,
            date.red,
            "Connected to the database".white,
            `${config.cloud.connectionType.toUpperCase()}`.italic.green
        );
});

export { cloud };
