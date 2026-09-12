-- ============================================
-- Migration: Update product_images table
-- Add public_id and type columns
-- ============================================

-- Add public_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'product_images' AND column_name = 'public_id'
    ) THEN
        ALTER TABLE product_images ADD COLUMN public_id VARCHAR(255);
    END IF;
END $$;

-- Add type column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'product_images' AND column_name = 'type'
    ) THEN
        ALTER TABLE product_images ADD COLUMN type VARCHAR(20) DEFAULT 'main' CHECK (type IN ('main', 'extra'));
    END IF;
END $$;

-- Create index on public_id
CREATE INDEX IF NOT EXISTS idx_product_images_public_id ON product_images(public_id);

-- Create index on type
CREATE INDEX IF NOT EXISTS idx_product_images_type ON product_images(product_id, type);

-- Update existing records to have type = 'main' if null
UPDATE product_images SET type = 'main' WHERE type IS NULL;




