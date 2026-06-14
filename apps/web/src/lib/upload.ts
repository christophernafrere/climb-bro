export const uploadImage = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset =
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset";

    if (!cloudName) {
        throw new Error("Cloudinary cloud name is missing");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        },
    );

    const payload = await res.json();

    if (!res.ok) {
        const cloudinaryError = payload?.error?.message;
        throw new Error(cloudinaryError || "Cloudinary upload failed");
    }

    return payload;
};
