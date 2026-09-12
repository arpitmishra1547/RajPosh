# Complete Prisma Image Upload System Setup

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

This creates the Prisma Client based on your schema.

### 3. Verify Database Connection

Make sure your `.env.local` has:

```env
DATABASE_URL="postgresql://Arpit:7412@localhost:5432/Rajposh"
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start Development Server

```bash
npm run dev
```

## What's Included

### ✅ Prisma Schema (`prisma/schema.prisma`)
- Complete database models
- ProductImage model with type ('main' | 'extra')
- Cascade delete relationships
- All indexes for performance

### ✅ API Route (`app/api/upload-product/route.js`)
- Handles multipart form data
- Uploads to Cloudinary with proper folder structure
- Saves to database using Prisma
- Returns uploaded image metadata

### ✅ Admin Upload UI (`components/admin/ProductImageUploader.jsx`)
- Category selection
- Product slug input
- Main images (1-9)
- Extra images (0-5)
- Image previews
- Success/error messages

### ✅ Image Helper Functions (`lib/images.js`)
- `getMainImages(productId)` - Get main images
- `getExtraImages(productId)` - Get extra images
- `getPrimaryImage(productId)` - Get primary image URL
- `getProductWithImages(productId)` - Get product with all images

### ✅ Product Pages
- **Listing Page**: Shows primary images from database
- **Detail Page**: Shows main images in gallery, extra images in recommendations

## Usage

### Upload Images

1. Go to `/admin/upload`
2. Select category
3. Enter product slug (e.g., `dailywear-pink-poshak-001`)
4. Upload main images (1-9)
5. Upload extra images (0-5)
6. Click "Upload Images"

### Cloudinary Structure

Images are saved as:
```
rajposh/
  poshak/
    dailywear-pink-poshak-001/
      main/
        1, 2, 3, ...
      extra/
        1, 2, 3, ...
```

### Database

Images are saved with:
- `imageUrl` - Cloudinary secure URL
- `publicId` - Cloudinary public ID
- `type` - 'main' or 'extra'
- `isPrimary` - true for first main image

## Testing

1. **Upload Test**:
   - Navigate to `/admin/upload`
   - Upload test images
   - Check Cloudinary dashboard
   - Check database with `npx prisma studio`

2. **Product Pages**:
   - Visit any product page
   - Verify images load from database
   - Check gallery functionality

## Troubleshooting

### Prisma Client Not Generated
```bash
npx prisma generate
```

### Database Connection Error
- Check DATABASE_URL in `.env.local`
- Verify PostgreSQL is running
- Check database exists

### Cloudinary Upload Fails
- Verify Cloudinary credentials in `.env.local`
- Check file sizes (Cloudinary has limits)
- Verify network connection

### Images Not Showing
- Check product exists in database
- Verify images were uploaded successfully
- Check browser console for errors
- Verify image URLs are accessible

## Next Steps

1. Add image deletion functionality
2. Add image reordering
3. Add bulk upload
4. Add image optimization settings
5. Add image validation (size, format)




