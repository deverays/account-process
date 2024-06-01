import { Request, Response } from "express";
import { handleFileUpload } from "../../utils/services/uploadServices";

export const uploadFile_post = async (req: Request, res: Response) => {
    /**@ts-ignore */
    const attachment = req.files?.attachment ? req.files.attachment[0] : null;

    if (!attachment) return res.status(400).json({ success: false, message: "No file uploaded" });

    try {
        const uploadResponse = await handleFileUpload(attachment);
        if (!uploadResponse) throw new Error("File upload failed");

        return res.status(201).json({ success: true, message: "File uploaded", url: uploadResponse });
    } catch (error) {
        return res.status(500).json({ success: false, message: "File upload failed" });
    }
};
