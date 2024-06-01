import mongoose from "mongoose";
import * as config from "../../../config.json";

export default async () =>
    await mongoose
        .connect(config.mongoose_url)
        .catch((err) => console.log(err));
