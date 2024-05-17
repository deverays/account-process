import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const handleFileUpload = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("attachment", files[0]);

        formData.append("type", "users");
        formData.append("id", "default_0");

        try {
            const response = await axios.post(
                `${VITE_API_BASE_URL}/cdn/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
};

export { handleFileUpload };
