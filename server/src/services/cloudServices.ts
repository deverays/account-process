import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import eventEmitter from "@chocolatemilkdev/emitter";

interface CloudEvents {
    join(isJoined: boolean): any;
}

class Cloud extends eventEmitter<CloudEvents> {
    private options: {
        connectionUrl?: string | "";
        connectionType?: keyof { mongoose: boolean; default: boolean };
    };

    constructor(options) {
        super();

        this.options = options;
    }

    async join() {
        const currType = this.options.connectionType || "default";

        if (
            (currType == "mongoose" || currType == "default") &&
            this.options.connectionUrl
        )
            await mongoose
                .connect(this.options.connectionUrl)
                .then(() => this.emit("join", true))
                .catch((err) => this.emit("join", false));
        else this.emit("join", false);
    }

    sign(data: any, secretKey: string) {
        return jwt.sign(data, secretKey);
    }

    verify(token: string, secretKey: string) {
        return jwt.verify(token, secretKey);
    }

    decode(token: string) {
        return jwt.decode(token);
    }
}

export default Cloud;
