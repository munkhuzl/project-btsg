export const UploadFilesInCloudinary = async (file: File): Promise<string> => {
    const CLOUDINARY_CLOUD_NAME = "dozicpox6";
    const CLOUDINARY_UPLOAD_PRESET = "btsg";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
            method: "POST",
            body: data,
        });

        const json = await res.json();
        return json.secure_url;
    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        return "";
    }
};
