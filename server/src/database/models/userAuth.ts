import mongoose, { Schema, Document } from 'mongoose';

interface IPublicInfo {
    username: string;
    created_at: Date;
    avatar_url: string;
    id: string;
}

interface IRequests {
    type: string;
    code: string;
    expiresAt?: Date;
}

export interface IUserAuth extends Document {
    email: string;
    password: string;
    access_token: string;
    public: IPublicInfo;
    requests?: IRequests[];
}

const UserAuthSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    access_token: { type: String, required: true },
    public: {
        type: {
            username: { type: String, required: true },
            created_at: { type: Date, default: Date.now },
            avatar_url: { type: String, required: true },
            id: { type: String, required: true }
        }, required: true
    },
    requests: [{
        type: { type: String, required: true },
        code: { type: String, required: true },
        expiresAt: { type: Date }
    }]
});

export default mongoose.model<IUserAuth>('UserAuth', UserAuthSchema);
