-- Migration: Update product_images table to support Cloudinary
-- Add type and public_id columns

ALTER TABLE product_images 
ADD COLUMN IF NOT EXISTS type VARCHAR(10) DEFAULT 'main' CHECK (type IN ('main', 'extra')),
ADD COLUMN IF NOT EXISTS public_id VARCHAR(255);

-- Update index to include type
CREATE INDEX IF NOT EXISTS idx_product_images_type ON product_images(product_id, type);
CREATE INDEX IF NOT EXISTS idx_product_images_public_id ON product_images(public_id);

-- Update existing records to have type = 'main' if not set
UPDATE product_images SET type = 'main' WHERE type IS NULL;

