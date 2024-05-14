import mongoose from "mongoose";
import * as config from "../../config.json";

export default async () =>
    await mongoose
        .connect(config.mongo_url)
        .catch((err) => console.log(err));
