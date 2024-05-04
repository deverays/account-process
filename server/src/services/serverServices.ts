import cors from "cors";
import bodyParser from "body-parser";
import eventEmitter from "@chocolatemilkdev/emitter";
import express, { Application, Router } from "express";

interface ServerEvents {
    installation(isInstallation: boolean): any;
}

class Server extends eventEmitter<ServerEvents> {
    private options: { port: string; baseUrl: string };

    app: Application;
    router: Router;

    constructor({ port, baseUrl }) {
        super();

        this.options = { port, baseUrl };

        this.app = express();
        this.router = Router();
    }

    public api = {
        installation: function () {
            this.this.app.use(cors());
            this.this.app.use(bodyParser.json());
            this.this.app.use(this.this.options.baseUrl, this.this.router);

            this.this.app.listen(this.this.options.port, () =>
                this.this.emit("installation", true)
            );
        },
        this: this,
    };
}

export default Server;
