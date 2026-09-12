# Cloudinary Image Upload System - Rajposh

Complete image upload system for the Rajposh e-commerce website using Cloudinary and PostgreSQL.

## Features

- ✅ Server-side image upload to Cloudinary
- ✅ Organized folder structure: `rajposh/<category>/<product-slug>/main` and `rajposh/<category>/<product-slug>/extra`
- ✅ Two image groups: Main images (6-9) and Extra images (3-5)
- ✅ Database integration with PostgreSQL
- ✅ Admin UI for easy image uploads
- ✅ Helper functions for fetching images

## Setup

### 1. Environment Variables

Make sure you have these environment variables set in your `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL=postgresql://Arpit:7412@localhost:5432/Rajposh
```

### 2. Database Migration

Run the migration to update the `product_images` table:

```bash
psql "postgresql://Arpit:7412@localhost:5432/Rajposh" -f database/migrations/001_update_product_images.sql
```

This adds:
- `public_id` column (Cloudinary public ID)
- `type` column ('main' or 'extra')
- Indexes for performance

### 3. Install Dependencies

All required packages are already installed:
- `cloudinary` - Cloudinary SDK
- `pg` - PostgreSQL client
- `formidable` - Form data parsing (handled by Next.js FormData API)

## Usage

### Admin Upload UI

1. Navigate to `/admin/upload`
2. Select category (Poshak, Saree, Odhni, Jewellery)
3. Enter product slug (e.g., `dailywear-pink-poshak-001`)
4. Optionally provide Product ID (if product exists in database)
5. Select main images (6-9 photos)
6. Select extra images (3-5 photos)
7. Click "Upload Images"

The system will:
- Upload images to Cloudinary in the correct folder structure
- Save image metadata to PostgreSQL
- Return uploaded image URLs and public IDs

### API Endpoint

**POST** `/api/upload-product`

**Form Data:**
- `category` (required): poshak | saree | odhni | jewellery
- `productSlug` (required): Product slug for folder naming
- `productId` (optional): Product ID from database
- `mainImages[]` (array): Main image files
- `extraImages[]` (array): Extra image files

**Response:**
```json
{
  "success": true,
  "message": "Successfully uploaded 8 images",
  "images": [
    {
      "id": 1,
      "product_id": 1,
      "image_url": "https://res.cloudinary.com/...",
      "public_id": "rajposh/poshak/dailywear-pink-poshak-001/main/1",
      "type": "main",
      "is_primary": true
    }
  ],
  "productId": 1
}
```

### Helper Functions

#### Get Main Images
```javascript
import { getMainImages } from '@/lib/images';

const mainImages = await getMainImages(productId);
// Returns: Array of main images sorted by primary first
```

#### Get Extra Images
```javascript
import { getExtraImages } from '@/lib/images';

const extraImages = await getExtraImages(productId);
// Returns: Array of extra images
```

#### Get All Images
```javascript
import { getAllProductImages } from '@/lib/images';

const { main, extra } = await getAllProductImages(productId);
// Returns: { main: [...], extra: [...] }
```

#### Get Primary Image
```javascript
import { getPrimaryImage } from '@/lib/images';

const primaryImageUrl = await getPrimaryImage(productId);
// Returns: Primary image URL or null
```

## Cloudinary Folder Structure

Images are organized as follows:

```
rajposh/
  ├── poshak/
  │   └── dailywear-pink-poshak-001/
  │       ├── main/
  │       │   ├── 1.jpg
  │       │   ├── 2.jpg
  │       │   └── ...
  │       └── extra/
  │           ├── 1.jpg
  │           └── ...
  ├── saree/
  ├── odhni/
  └── jewellery/
```

## Database Schema

The `product_images` table structure:

```sql
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    public_id VARCHAR(255),
    type VARCHAR(20) DEFAULT 'main' CHECK (type IN ('main', 'extra')),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

## Product Detail Page Integration

The product detail page automatically:
- Fetches images from the database
- Falls back to JSON data if database images aren't available
- Displays main images in the gallery
- Uses extra images for recommendations (when implemented)

## File Structure

```
app/
  ├── api/
  │   └── upload-product/
  │       └── route.js          # Upload API endpoint
  └── admin/
      └── upload/
          └── page.js           # Admin upload UI page

components/
  └── admin/
      └── ProductImageUpload.js # Upload component

lib/
  ├── cloudinary.js             # Cloudinary utilities
  ├── db.js                     # Database functions
  └── images.js                 # Image helper functions

database/
  └── migrations/
      └── 001_update_product_images.sql
```

## Best Practices

1. **Image Naming**: Use descriptive slugs (e.g., `dailywear-pink-poshak-001`)
2. **Image Count**: 
   - Main images: 6-9 photos
   - Extra images: 3-5 photos
3. **Image Quality**: Upload high-quality images, Cloudinary will optimize
4. **Primary Image**: First main image is automatically set as primary
5. **Error Handling**: The system continues uploading even if one image fails

## Troubleshooting

### Images not uploading
- Check Cloudinary credentials in `.env.local`
- Verify database connection
- Check product exists in database (or provide productId)

### Images not displaying
- Verify images were saved to database
- Check image URLs are accessible
- Ensure product ID matches

### Database errors
- Run the migration script
- Verify `product_images` table has `public_id` and `type` columns
- Check foreign key constraints

## Next Steps

1. Add image deletion functionality
2. Add image reordering
3. Add bulk upload for multiple products
4. Implement image optimization settings
5. Add image validation (size, format, dimensions)




