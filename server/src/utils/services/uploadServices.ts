import axios from "axios";
import fs from "fs";
import { bunny as bunnyConfig } from "../../../config.json";

const { storage_name, access_key, host_name } = bunnyConfig;

export const handleFileUpload = async (file) => {
    const { path, filename, originalname } = file;
    const fileStream = fs.createReadStream(path);
    const uniqueFilename = `${Date.now()}-${filename}-${originalname}`;

    const fileUrl = `https://storage.bunnycdn.com/${storage_name}/${uniqueFilename}`;

    try {
        await axios.put(fileUrl, fileStream, {
            headers: {
                AccessKey: access_key,
            },
        });

        return `https://${host_name}/${uniqueFilename}`;
    } catch (error) {
        console.error("Error uploading file:", error);
        return false;
    }
};
