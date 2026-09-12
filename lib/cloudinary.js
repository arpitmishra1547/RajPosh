import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Generate Cloudinary upload path for a product
 * @param {string} category - Product category (poshak, saree, odhni, jewellery)
 * @param {string} productSlug - Product slug
 * @param {string} type - Image type ('main' or 'extra')
 * @param {number} index - Image index (1, 2, 3...)
 * @returns {string} Cloudinary public_id path
 */
export function getCloudinaryPath(category, productSlug, type, index) {
  return `rajposh/${category}/${productSlug}/${type}/${index}`;
}

/**
 * Upload image to Cloudinary
 * @param {Buffer|string} file - File buffer or file path
 * @param {string} publicId - Cloudinary public_id
 * @param {object} options - Additional upload options
 * @returns {Promise<object>} Upload result
 */
export async function uploadToCloudinary(file, publicId, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      public_id: publicId,
      resource_type: 'image',
      overwrite: false,
      ...options,
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(file);
  });
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public_id
 * @returns {Promise<object>} Deletion result
 */
export async function deleteFromCloudinary(publicId) {
  return cloudinary.uploader.destroy(publicId);
}

/**
 * Generate signed upload parameters for client-side uploads
 * @param {string} publicId - Cloudinary public_id
 * @param {object} options - Additional options
 * @returns {object} Signed parameters
 */
export function generateUploadSignature(publicId, options = {}) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const params = {
    public_id,
    timestamp,
    ...options,
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    ...params,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
  };
}
