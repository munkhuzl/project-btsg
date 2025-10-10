const CLOUDINARY_CLOUD_NAME = 'dozicpox6';
const CLOUDINARY_UPLOAD_PRESET = 'btsg';

export const UploadFilesInCloudinary = async (file: string) => {
  console.log(`Uploading: `, file);

  const data = new FormData();

  data.append('file', file);
  data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'post',
      body: data,
    });
    const info = await res.json();
    return info.secure_url;
  } catch (e) {
    console.error(e);
    return '';
  }
};
