import pg from 'pg';

const { Pool } = pg;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://Arpit:7412@localhost:5432/Rajposh',
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;

/**
 * Insert product images into database
 * @param {number} productId - Product ID
 * @param {Array<{image_url: string, public_id: string, type: string, is_primary: boolean}>} images - Array of image objects
 * @returns {Promise<Array>} Inserted image records
 */
export async function insertProductImages(productId, images) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const insertedImages = [];
    
    for (const image of images) {
      const result = await client.query(
        `INSERT INTO product_images (product_id, image_url, public_id, type, is_primary)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [productId, image.image_url, image.public_id, image.type, image.is_primary]
      );
      insertedImages.push(result.rows[0]);
    }
    
    await client.query('COMMIT');
    return insertedImages;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Get main images for a product
 * @param {number} productId - Product ID
 * @returns {Promise<Array>} Main images
 */
export async function getMainImages(productId) {
  const result = await pool.query(
    `SELECT * FROM product_images 
     WHERE product_id = $1 AND type = 'main' 
     ORDER BY is_primary DESC, id ASC`,
    [productId]
  );
  return result.rows;
}

/**
 * Get extra images for a product
 * @param {number} productId - Product ID
 * @returns {Promise<Array>} Extra images
 */
export async function getExtraImages(productId) {
  const result = await pool.query(
    `SELECT * FROM product_images 
     WHERE product_id = $1 AND type = 'extra' 
     ORDER BY id ASC`,
    [productId]
  );
  return result.rows;
}

/**
 * Get all images for a product
 * @param {number} productId - Product ID
 * @returns {Promise<Array>} All images
 */
export async function getProductImages(productId) {
  const result = await pool.query(
    `SELECT * FROM product_images 
     WHERE product_id = $1 
     ORDER BY type, is_primary DESC, id ASC`,
    [productId]
  );
  return result.rows;
}

/**
 * Get product by slug
 * @param {string} category - Category name
 * @param {string} productSlug - Product slug
 * @returns {Promise<object|null>} Product or null
 */
export async function getProductBySlug(category, productSlug) {
  // First try to find by matching slug in product name or SKU
  const result = await pool.query(
    `SELECT p.* FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE LOWER(c.name) = LOWER($1)
     AND (LOWER(REPLACE(p.name, ' ', '-')) LIKE LOWER($2) OR LOWER(p.sku) LIKE LOWER($2))
     LIMIT 1`,
    [category, `%${productSlug}%`]
  );
  return result.rows[0] || null;
}

/**
 * Get product by ID
 * @param {number} productId - Product ID
 * @returns {Promise<object|null>} Product or null
 */
export async function getProductById(productId) {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [productId]
  );
  return result.rows[0] || null;
}

/**
 * Get all products for a category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Products
 */
export async function getProductsByCategory(category) {
  const result = await pool.query(
    `SELECT p.* FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE LOWER(c.name) = LOWER($1)
     ORDER BY p.created_at DESC`,
    [category]
  );
  return result.rows;
}
