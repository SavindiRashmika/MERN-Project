const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
    console.log("Cloudinary Name:", process.env.REACT_APP_CLOUD_NAME_CLOUDINARY); 

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Failed to upload image");

        return response.json();
    } catch (error) {
        console.error("Upload Error:", error);
        return null;
    }
};

export default uploadImage;
