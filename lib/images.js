import { prisma } from './prisma';

/**
 * Get main images for a product
 * @param {number} productId - Product ID
 * @returns {Promise<Array>} Main images sorted by primary first
 */
export async function getMainImages(productId) {
  return await prisma.productImage.findMany({
    where: {
      productId,
      type: 'main',
    },
    orderBy: [
      { isPrimary: 'desc' },
      { id: 'asc' },
    ],
  });
}

/**
 * Get extra images for a product
 * @param {number} productId - Product ID
 * @returns {Promise<Array>} Extra images
 */
export async function getExtraImages(productId) {
  return await prisma.productImage.findMany({
    where: {
      productId,
      type: 'extra',
    },
    orderBy: {
      id: 'asc',
    },
  });
}

/**
 * Get all images for a product
 * @param {number} productId - Product ID
 * @returns {Promise<{main: Array, extra: Array}>} Object with main and extra images
 */
export async function getAllProductImages(productId) {
  const [main, extra] = await Promise.all([
    getMainImages(productId),
    getExtraImages(productId),
  ]);

  return {
    main,
    extra,
  };
}

/**
 * Get primary image URL for a product
 * @param {number} productId - Product ID
 * @returns {Promise<string|null>} Primary image URL or null
 */
export async function getPrimaryImage(productId) {
  const primary = await prisma.productImage.findFirst({
    where: {
      productId,
      type: 'main',
      isPrimary: true,
    },
  });

  if (primary) {
    return primary.imageUrl;
  }

  // Fallback to first main image if no primary is set
  const firstMain = await prisma.productImage.findFirst({
    where: {
      productId,
      type: 'main',
    },
    orderBy: {
      id: 'asc',
    },
  });

  return firstMain ? firstMain.imageUrl : null;
}

/**
 * Get product with images
 * @param {number} productId - Product ID
 * @returns {Promise<object|null>} Product with images
 */
export async function getProductWithImages(productId) {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: {
        orderBy: [
          { type: 'asc' },
          { isPrimary: 'desc' },
          { id: 'asc' },
        ],
      },
      category: true,
      subcategory: true,
    },
  });
}
