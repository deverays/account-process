import { type Response, type Request } from "express";
import { handleFileUpload } from "../../services/cdnServices";

export const upload_post = async (req: Request, res: Response) => {
    /**@ts-ignore */
    const attachment = req.files?.attachment[0];

    if (!attachment) {
        return res
            .status(400)
            .json({ success: false, message: "no file uploaded" });
    }

    const uploadResponse = await handleFileUpload(attachment);

    if (uploadResponse) {
        res.status(201).json({
            success: true,
            message: "file uploaded",
            url: uploadResponse,
        });
    } else {
        res.status(500).json({ success: false, message: "file upload failed" });
    }
};
