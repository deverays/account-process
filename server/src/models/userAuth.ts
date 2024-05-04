import { Schema, model } from "mongoose";

interface UserAuthTypes {
    email: string;
    password: string;
    access_token: string;

    public: {
        username: string;
        avatar: string;
        created_at: Date;
        id: string;
    };

    password_reset?: {
        resetCode?: string;
        expiresAt?: Date;
    };
}

const userAuthSchema = new Schema<UserAuthTypes>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email: string) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: (props) => `${props.value} not a valid email address!`,
        },
    },

    password: {
        type: String,
        required: true
    },

    access_token: {
        type: String,
        required: true,
        unique: true,
    },

    public: {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        avatar: {
            type: String,
            required: false,
        },
        id: {
            type: String,
            required: true
        }
    },

    password_reset: {
        resetCode: {
            type: String,
        },
        expiresAt: {
            type: Date,
        },
    },
});

export { UserAuthTypes };
export default model("UserAuth", userAuthSchema);
