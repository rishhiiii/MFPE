const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Function to upload image from buffer (for multer memory storage)
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    console.log('Starting Cloudinary upload...');
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload successful:', result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary
};
