import { NextResponse } from 'next/server';
import { uploadToCloudinary, getCloudinaryPath } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/upload-product
 * Upload product images to Cloudinary and save to database using Prisma
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const category = formData.get('category');
    const productSlug = formData.get('productSlug');
    const productId = formData.get('productId');

    if (!category || !productSlug) {
      return NextResponse.json(
        { error: 'Category and productSlug are required' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['poshak', 'saree', 'odhni', 'jewellery'];
    if (!validCategories.includes(category.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: poshak, saree, odhni, jewellery' },
        { status: 400 }
      );
    }

    // Get product ID (either from form or find by slug)
    let productIdToUse = productId ? parseInt(productId) : null;
    
    if (!productIdToUse) {
      // Try to find product by slug
      const product = await prisma.product.findFirst({
        where: {
          slug: productSlug,
          category: {
            name: {
              equals: category,
              mode: 'insensitive',
            },
          },
        },
      });
      
      if (product) {
        productIdToUse = product.id;
      } else {
        return NextResponse.json(
          { error: 'Product not found. Please create the product first or provide productId.' },
          { status: 404 }
        );
      }
    }

    const uploadedImages = [];

    // Process main images
    const mainImages = formData.getAll('mainImages[]');
    if (mainImages && mainImages.length > 0) {
      for (let i = 0; i < mainImages.length; i++) {
        const file = mainImages[i];
        if (file && file.size > 0) {
          try {
            const index = i + 1;
            const publicId = getCloudinaryPath(category, productSlug, 'main', index);
            
            // Read file buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload to Cloudinary
            const uploadResult = await uploadToCloudinary(buffer, publicId, {
              folder: `rajposh/${category}/${productSlug}/main`,
            });

            uploadedImages.push({
              imageUrl: uploadResult.secure_url,
              publicId: uploadResult.public_id,
              type: 'main',
              isPrimary: i === 0, // First image is primary
            });
          } catch (error) {
            console.error(`Error uploading main image ${i + 1}:`, error);
            // Continue with other images even if one fails
          }
        }
      }
    }

    // Process extra images
    const extraImages = formData.getAll('extraImages[]');
    if (extraImages && extraImages.length > 0) {
      for (let i = 0; i < extraImages.length; i++) {
        const file = extraImages[i];
        if (file && file.size > 0) {
          try {
            const index = i + 1;
            const publicId = getCloudinaryPath(category, productSlug, 'extra', index);
            
            // Read file buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload to Cloudinary
            const uploadResult = await uploadToCloudinary(buffer, publicId, {
              folder: `rajposh/${category}/${productSlug}/extra`,
            });

            uploadedImages.push({
              imageUrl: uploadResult.secure_url,
              publicId: uploadResult.public_id,
              type: 'extra',
              isPrimary: false,
            });
          } catch (error) {
            console.error(`Error uploading extra image ${i + 1}:`, error);
            // Continue with other images even if one fails
          }
        }
      }
    }

    if (uploadedImages.length === 0) {
      return NextResponse.json(
        { error: 'No images were uploaded' },
        { status: 400 }
      );
    }

    // Save images to database using Prisma
    const savedImages = await prisma.$transaction(
      uploadedImages.map((image) =>
        prisma.productImage.create({
          data: {
            productId: productIdToUse,
            imageUrl: image.imageUrl,
            publicId: image.publicId,
            type: image.type,
            isPrimary: image.isPrimary,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${uploadedImages.length} images`,
      images: savedImages,
      productId: productIdToUse,
    });
  } catch (error) {
    console.error('Error in upload-product API:', error);
    return NextResponse.json(
      { error: 'Failed to upload images', details: error.message },
      { status: 500 }
    );
  }
}
