-- ============================================
-- Rajposh E-commerce Database Seed Data
-- ============================================

-- ============================================
-- 1. Insert Categories
-- ============================================
INSERT INTO categories (name) VALUES
    ('Poshak'),
    ('Saree'),
    ('Odhni'),
    ('Jewellery')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 2. Insert Subcategories
-- ============================================
-- Poshak Subcategories
INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Daily wear' FROM categories c WHERE c.name = 'Poshak'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Party wear' FROM categories c WHERE c.name = 'Poshak'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Bridal' FROM categories c WHERE c.name = 'Poshak'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Cotton Special' FROM categories c WHERE c.name = 'Poshak'
ON CONFLICT (category_id, name) DO NOTHING;

-- Saree Subcategories
INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Royal Georgette' FROM categories c WHERE c.name = 'Saree'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Chiffon' FROM categories c WHERE c.name = 'Saree'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Daily wear' FROM categories c WHERE c.name = 'Saree'
ON CONFLICT (category_id, name) DO NOTHING;

-- Odhni Subcategories
INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Cotton' FROM categories c WHERE c.name = 'Odhni'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Party Wear' FROM categories c WHERE c.name = 'Odhni'
ON CONFLICT (category_id, name) DO NOTHING;

-- Jewellery Subcategories
INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Aad Set' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Earring' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Necklace' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Bor' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Nath' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Hathphool' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Sets' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO subcategories (category_id, name)
SELECT c.id, 'Bridal Sets' FROM categories c WHERE c.name = 'Jewellery'
ON CONFLICT (category_id, name) DO NOTHING;

-- ============================================
-- 3. Insert Sample Products
-- ============================================

-- POSHAK PRODUCTS (10 products)
INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Traditional Rajasthani Poshak - Daily Wear',
    'Elegant traditional poshak perfect for daily occasions. Made with premium cotton fabric, comfortable and stylish.',
    8000.00,
    7500.00,
    25,
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Red', 'Blue', 'Green', 'Yellow'],
    'POSH-DW-001'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Daily wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Cotton Poshak Set - Daily Wear',
    'Comfortable cotton poshak set with traditional prints. Perfect for everyday wear.',
    6000.00,
    NULL,
    30,
    ARRAY['S', 'M', 'L'],
    ARRAY['Pink', 'Blue', 'Orange'],
    'POSH-DW-002'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Daily wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Designer Poshak - Party Wear',
    'Stunning party wear poshak with intricate embroidery and mirror work. Perfect for celebrations.',
    25000.00,
    22000.00,
    15,
    ARRAY['M', 'L', 'XL'],
    ARRAY['Maroon', 'Navy Blue', 'Purple'],
    'POSH-PW-001'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Party wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Premium Party Wear Poshak',
    'Luxurious party wear poshak with heavy zari work and sequins. Make a statement at any event.',
    30000.00,
    28000.00,
    12,
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Red', 'Gold', 'Green'],
    'POSH-PW-002'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Party wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Bridal Poshak Collection',
    'Exquisite bridal poshak with heavy embroidery, zari work, and traditional motifs. Perfect for your special day.',
    50000.00,
    45000.00,
    8,
    ARRAY['M', 'L', 'XL'],
    ARRAY['Red', 'Maroon', 'Pink'],
    'POSH-BR-001'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Bridal';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Luxury Bridal Poshak',
    'Premium bridal poshak with extensive zari and embroidery work. Handcrafted with love.',
    75000.00,
    70000.00,
    5,
    ARRAY['M', 'L'],
    ARRAY['Red', 'Gold'],
    'POSH-BR-002'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Bridal';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Cotton Special Poshak',
    'Comfortable cotton poshak perfect for summer wear. Breathable and stylish with traditional prints.',
    6000.00,
    5500.00,
    35,
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['White', 'Beige', 'Light Blue'],
    'POSH-CS-001'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Cotton Special';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Premium Cotton Poshak',
    'Premium quality cotton poshak with hand block prints. Traditional and elegant.',
    8500.00,
    NULL,
    28,
    ARRAY['S', 'M', 'L'],
    ARRAY['Blue', 'Green', 'Red'],
    'POSH-CS-002'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Cotton Special';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Modern Daily Wear Poshak',
    'Contemporary design poshak perfect for modern daily wear. Comfort meets style.',
    7000.00,
    6500.00,
    22,
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Navy', 'Grey', 'Black'],
    'POSH-DW-003'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Daily wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Festive Party Wear Poshak',
    'Beautiful festive poshak with mirror work and embroidery. Perfect for celebrations.',
    22000.00,
    20000.00,
    18,
    ARRAY['M', 'L', 'XL'],
    ARRAY['Orange', 'Pink', 'Yellow'],
    'POSH-PW-003'
FROM categories c, subcategories s
WHERE c.name = 'Poshak' AND s.name = 'Party wear';

-- SAREE PRODUCTS (10 products)
INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Royal Georgette Saree with Gold Border',
    'Elegant royal georgette saree with intricate gold border detailing. Perfect for special occasions and weddings.',
    30000.00,
    28000.00,
    20,
    ARRAY['One Size'],
    ARRAY['Red', 'Green', 'Blue', 'Maroon'],
    'SAR-RG-001'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Royal Georgette';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Premium Royal Georgette Saree',
    'Premium royal georgette saree with elaborate border work. Drapes beautifully.',
    35000.00,
    32000.00,
    15,
    ARRAY['One Size'],
    ARRAY['Pink', 'Purple', 'Navy'],
    'SAR-RG-002'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Royal Georgette';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Classic Royal Georgette Saree',
    'Classic royal georgette saree with elegant border. Timeless beauty.',
    28000.00,
    NULL,
    25,
    ARRAY['One Size'],
    ARRAY['Red', 'Green', 'Blue'],
    'SAR-RG-003'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Royal Georgette';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Chiffon Daily Wear Saree',
    'Comfortable chiffon saree perfect for daily wear. Lightweight and easy to drape with elegant patterns.',
    15000.00,
    14000.00,
    30,
    ARRAY['One Size'],
    ARRAY['Blue', 'Pink', 'Green', 'Yellow'],
    'SAR-CH-001'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Chiffon';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Chiffon Party Saree',
    'Elegant chiffon saree perfect for parties and celebrations. Beautiful prints and patterns.',
    18000.00,
    16000.00,
    22,
    ARRAY['One Size'],
    ARRAY['Red', 'Maroon', 'Purple'],
    'SAR-CH-002'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Chiffon';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Elegant Chiffon Saree',
    'Elegant chiffon saree with beautiful prints. Perfect for any occasion.',
    16000.00,
    NULL,
    28,
    ARRAY['One Size'],
    ARRAY['Orange', 'Pink', 'Blue'],
    'SAR-CH-003'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Chiffon';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Daily Wear Saree Comfort',
    'Comfortable daily wear saree in soft fabric. Easy to drape and maintain.',
    12000.00,
    11000.00,
    35,
    ARRAY['One Size'],
    ARRAY['White', 'Beige', 'Light Blue'],
    'SAR-DW-001'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Daily wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Traditional Daily Wear Saree',
    'Traditional daily wear saree with hand block prints. Comfortable and elegant.',
    10000.00,
    NULL,
    40,
    ARRAY['One Size'],
    ARRAY['Red', 'Blue', 'Green'],
    'SAR-DW-002'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Daily wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Premium Royal Georgette Collection',
    'Premium collection royal georgette saree with heavy border work.',
    40000.00,
    38000.00,
    10,
    ARRAY['One Size'],
    ARRAY['Red', 'Gold', 'Maroon'],
    'SAR-RG-004'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Royal Georgette';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Designer Chiffon Saree',
    'Designer chiffon saree with modern and traditional fusion patterns.',
    20000.00,
    18000.00,
    18,
    ARRAY['One Size'],
    ARRAY['Navy', 'Purple', 'Black'],
    'SAR-CH-004'
FROM categories c, subcategories s
WHERE c.name = 'Saree' AND s.name = 'Chiffon';

-- ODHNI PRODUCTS (10 products)
INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Traditional Cotton Odhni',
    'Traditional cotton odhni with beautiful prints and patterns. Perfect for everyday use.',
    2000.00,
    1800.00,
    50,
    ARRAY['One Size'],
    ARRAY['Red', 'Blue', 'Green', 'Yellow'],
    'ODH-COT-001'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Cotton';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Hand Block Print Cotton Odhni',
    'Cotton odhni with hand block prints. Traditional and elegant.',
    2500.00,
    NULL,
    45,
    ARRAY['One Size'],
    ARRAY['Pink', 'Orange', 'Blue'],
    'ODH-COT-002'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Cotton';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Premium Cotton Odhni',
    'Premium quality cotton odhni with intricate designs.',
    3000.00,
    2800.00,
    40,
    ARRAY['One Size'],
    ARRAY['Maroon', 'Navy', 'Purple'],
    'ODH-COT-003'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Cotton';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Party Wear Odhni',
    'Elegant party wear odhni with sequins and embroidery work. Perfect for celebrations.',
    5000.00,
    4500.00,
    30,
    ARRAY['One Size'],
    ARRAY['Gold', 'Silver', 'Red'],
    'ODH-PW-001'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Party Wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Designer Party Odhni',
    'Designer party wear odhni with sequins and mirror work. Make a statement.',
    6000.00,
    5500.00,
    25,
    ARRAY['One Size'],
    ARRAY['Pink', 'Blue', 'Green'],
    'ODH-PW-002'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Party Wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Luxury Party Odhni',
    'Luxury party wear odhni with heavy embroidery and zari work.',
    8000.00,
    7500.00,
    20,
    ARRAY['One Size'],
    ARRAY['Red', 'Maroon', 'Gold'],
    'ODH-PW-003'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Party Wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Simple Cotton Odhni',
    'Simple and elegant cotton odhni for daily wear.',
    1500.00,
    NULL,
    60,
    ARRAY['One Size'],
    ARRAY['White', 'Beige', 'Light Blue'],
    'ODH-COT-004'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Cotton';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Printed Cotton Odhni',
    'Beautifully printed cotton odhni with traditional motifs.',
    2200.00,
    2000.00,
    48,
    ARRAY['One Size'],
    ARRAY['Yellow', 'Orange', 'Pink'],
    'ODH-COT-005'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Cotton';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Festive Party Odhni',
    'Festive party wear odhni perfect for special occasions.',
    7000.00,
    6500.00,
    22,
    ARRAY['One Size'],
    ARRAY['Purple', 'Navy', 'Black'],
    'ODH-PW-004'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Party Wear';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Embroidered Cotton Odhni',
    'Embroidered cotton odhni with traditional designs.',
    3500.00,
    3200.00,
    35,
    ARRAY['One Size'],
    ARRAY['Red', 'Blue', 'Green'],
    'ODH-COT-006'
FROM categories c, subcategories s
WHERE c.name = 'Odhni' AND s.name = 'Cotton';

-- JEWELLERY PRODUCTS (10 products)
INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Aad Set Gold Jewellery',
    'Traditional gold aad set with intricate designs and premium quality. Perfect for weddings.',
    45000.00,
    42000.00,
    10,
    ARRAY['One Size'],
    ARRAY['Gold'],
    'JWL-AAD-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Aad Set';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Premium Aad Set',
    'Premium aad set with heavy gold work. Exquisite craftsmanship.',
    55000.00,
    50000.00,
    8,
    ARRAY['One Size'],
    ARRAY['Gold'],
    'JWL-AAD-002'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Aad Set';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Earring Set Traditional',
    'Beautiful traditional earring set with traditional motifs. Perfect for special occasions.',
    15000.00,
    14000.00,
    25,
    ARRAY['One Size'],
    ARRAY['Gold', 'Silver'],
    'JWL-EAR-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Earring';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Designer Earring Collection',
    'Designer earring collection with modern and traditional designs.',
    20000.00,
    18000.00,
    20,
    ARRAY['One Size'],
    ARRAY['Gold', 'Silver', 'Rose Gold'],
    'JWL-EAR-002'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Earring';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Necklace Set',
    'Elegant necklace set perfect for weddings and special occasions. Traditional designs.',
    35000.00,
    32000.00,
    15,
    ARRAY['One Size'],
    ARRAY['Gold'],
    'JWL-NEC-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Necklace';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Premium Necklace Set',
    'Premium necklace set with heavy gold work and precious stones.',
    50000.00,
    45000.00,
    12,
    ARRAY['One Size'],
    ARRAY['Gold'],
    'JWL-NEC-002'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Necklace';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Bor Traditional',
    'Traditional bor with intricate designs. Perfect for traditional occasions.',
    8000.00,
    7500.00,
    30,
    ARRAY['One Size'],
    ARRAY['Gold', 'Silver'],
    'JWL-BOR-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Bor';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Nath Set',
    'Beautiful nath set with traditional designs. Elegant and timeless.',
    12000.00,
    11000.00,
    22,
    ARRAY['One Size'],
    ARRAY['Gold', 'Silver'],
    'JWL-NAT-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Nath';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Hathphool Set',
    'Elegant hathphool set for hands with traditional motifs. Perfect for weddings.',
    18000.00,
    16000.00,
    18,
    ARRAY['One Size'],
    ARRAY['Gold'],
    'JWL-HAT-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Hathphool';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Jewellery Sets Complete',
    'Complete jewellery set including necklace, earrings, and more. Perfect for special occasions.',
    60000.00,
    55000.00,
    10,
    ARRAY['One Size'],
    ARRAY['Gold'],
    'JWL-SET-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Sets';

INSERT INTO products (category_id, subcategory_id, name, description, price, discount_price, stock_quantity, size_options, color_options, sku)
SELECT 
    c.id,
    s.id,
    'Bridal Jewellery Sets',
    'Premium bridal jewellery set with heavy gold work and precious stones. Perfect for your special day.',
    100000.00,
    95000.00,
    5,
    ARRAY['One Size'],
    ARRAY['Gold'],
    'JWL-BRS-001'
FROM categories c, subcategories s
WHERE c.name = 'Jewellery' AND s.name = 'Bridal Sets';

-- ============================================
-- 4. Insert Product Images (sample images for first few products)
-- ============================================
-- Note: Update image URLs with actual paths
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT p.id, '/beautiful-silk-saree-traditional-indian.jpg', TRUE
FROM products p
WHERE p.sku = 'POSH-DW-001';

INSERT INTO product_images (product_id, image_url, is_primary)
SELECT p.id, '/traditional-rajasthani-poshak-ethnic-wear.jpg', TRUE
FROM products p
WHERE p.sku = 'POSH-PW-001';

INSERT INTO product_images (product_id, image_url, is_primary)
SELECT p.id, '/indian-bridal-wedding-lehenga-dress.jpg', TRUE
FROM products p
WHERE p.sku = 'POSH-BR-001';

INSERT INTO product_images (product_id, image_url, is_primary)
SELECT p.id, '/beautiful-silk-saree-traditional-indian.jpg', TRUE
FROM products p
WHERE p.sku = 'SAR-RG-001';

INSERT INTO product_images (product_id, image_url, is_primary)
SELECT p.id, '/traditional-odhni-dupatta-indian-fashion.jpg', TRUE
FROM products p
WHERE p.sku = 'ODH-COT-001';

INSERT INTO product_images (product_id, image_url, is_primary)
SELECT p.id, '/gold-indian-jewelry-ornaments-traditional.jpg', TRUE
FROM products p
WHERE p.sku = 'JWL-AAD-001';

