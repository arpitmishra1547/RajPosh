# Prisma Image Upload System - Rajposh

Complete image upload and management system using Prisma, Cloudinary, and Next.js App Router.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Run Database Migrations

If you're using Prisma migrations (recommended):

```bash
npx prisma migrate dev --name init
```

Or if you already have the database schema, just generate the client:

```bash
npx prisma generate
```

### 4. Environment Variables

Make sure you have these in `.env.local`:

```env
DATABASE_URL="postgresql://Arpit:7412@localhost:5432/Rajposh"
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Features

✅ **Prisma ORM** - Type-safe database access
✅ **Cloudinary Integration** - Server-side signed uploads
✅ **Two Image Groups** - Main (9 images) and Extra (3-5 images)
✅ **Organized Folder Structure** - `rajposh/<category>/<product-slug>/main|extra`
✅ **Admin Upload UI** - Easy image management
✅ **Product Pages** - Automatic image fetching
✅ **Primary Image** - First main image is automatically primary

## File Structure

```
prisma/
  └── schema.prisma          # Prisma schema with all models

app/
  ├── api/
  │   └── upload-product/
  │       └── route.js        # Upload API endpoint
  ├── admin/
  │   └── upload/
  │       └── page.js         # Admin upload page
  └── collection/
      └── [category]/
          └── [subcategory]/
              ├── page.js     # Product listing (server)
              ├── page-client.jsx  # Product listing (client)
              └── [productId]/
                  └── page.js # Product detail

components/
  ├── admin/
  │   └── ProductImageUploader.jsx  # Upload component
  ├── ProductCard.js         # Product card with primary image
  ├── ProductDetail.js       # Product detail with gallery
  └── ProductGrid.js         # Product grid

lib/
  ├── prisma.js              # Prisma client instance
  ├── cloudinary.js          # Cloudinary utilities
  └── images.js              # Image helper functions
```

## Usage

### Admin Upload

1. Navigate to `/admin/upload`
2. Select category
3. Enter product slug
4. Upload main images (1-9)
5. Upload extra images (0-5)
6. Click "Upload Images"

### API Endpoint

**POST** `/api/upload-product`

**Form Data:**
- `category` (required): poshak | saree | odhni | jewellery
- `productSlug` (required): e.g., `dailywear-pink-poshak-001`
- `productId` (optional): Product ID from database
- `mainImages[]` (array): Main image files
- `extraImages[]` (array): Extra image files

### Helper Functions

```javascript
import { getMainImages, getExtraImages, getPrimaryImage } from '@/lib/images';

// Get main images
const mainImages = await getMainImages(productId);

// Get extra images
const extraImages = await getExtraImages(productId);

// Get primary image URL
const primaryUrl = await getPrimaryImage(productId);

// Get product with all images
const product = await getProductWithImages(productId);
```

## Prisma Models

### ProductImage

```prisma
model ProductImage {
  id          Int       @id @default(autoincrement())
  productId   Int
  imageUrl    String
  publicId    String?
  type        ImageType @default(main)  // 'main' or 'extra'
  isPrimary   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  product     Product   @relation(...)
}
```

### Product

```prisma
model Product {
  id            Int            @id @default(autoincrement())
  categoryId    Int
  subcategoryId Int
  name          String
  description   String?
  price         Decimal
  slug          String?
  images        ProductImage[]
  // ... other fields
}
```

## Cloudinary Structure

Images are organized as:

```
rajposh/
  ├── poshak/
  │   └── dailywear-pink-poshak-001/
  │       ├── main/
  │       │   ├── 1
  │       │   ├── 2
  │       │   └── ...
  │       └── extra/
  │           ├── 1
  │           └── ...
  ├── saree/
  ├── odhni/
  └── jewellery/
```

## Development

### Generate Prisma Client

After schema changes:

```bash
npx prisma generate
```

### View Database

```bash
npx prisma studio
```

### Run Migrations

```bash
npx prisma migrate dev
```

## Notes

- First main image is automatically set as `isPrimary = true`
- Images are indexed (1, 2, 3...) in Cloudinary public_id
- Product pages automatically fetch images from database
- Falls back to JSON data if database is empty
- All database operations use Prisma for type safety




