import mongoose, { Schema, Document } from "mongoose";

export interface IRequest {
    type: string;
    code?: string;
    link?: string;
    expiresAt?: Date;
}

export interface IConnection {
    type: string;
    expiresAt?: Date;
}

export interface IUserAuth extends Document {
    email: string;
    password: string;
    access_token: string;
    username: string;
    created_at: Date;
    avatar: string;
    id: string;
    requests?: IRequest[];
    connections: IConnection[];
}

const UserAuthSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    access_token: { type: String, required: true },
    username: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    avatar: { type: String, required: true },
    id: { type: String, required: true },
    requests: [{
        type: { type: String, required: true },
        code: { type: String, required: true },
        link: { type: String, required: false },
        expiresAt: { type: Date },
    }],
    connections: [{
        type: { type: String, required: true },
        expiresAt: { type: Date },
    }],
});

export default mongoose.model<IUserAuth>("UserAuth", UserAuthSchema);
