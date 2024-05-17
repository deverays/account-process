import axios from "axios";
import fs from "fs";
import * as config from "../../config.json";

export const handleFileUpload = async (file: {
    path: string;
    filename: string;
    originalname: string;
},) => {
    const fileStream = fs.createReadStream(file.path);
    const uniqueFilename = `${Date.now()}-${file.filename}-${file.originalname}`;

    const fileUrl = `https://storage.bunnycdn.com/${config.bunny.storage_name}/${uniqueFilename}`;

    const uploadResponse = await axios.put(
        fileUrl,
        fileStream,
        {
            headers: {
                AccessKey: config.bunny.access_key,
            },
        }
    );

    if (uploadResponse.data) {
        return `https://${config.bunny.host_name}/${uniqueFilename}`;
    } else {
        return false;
    }
};
