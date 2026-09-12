# Rajposh Database Setup

This directory contains the PostgreSQL database schema and seed data for the Rajposh e-commerce website.

## Files

- `schema.sql` - Complete database schema with all tables, indexes, and triggers
- `seed.sql` - Sample data for categories, subcategories, and products
- `README.md` - This file

## Database Connection

```
DATABASE_URL="postgresql://Arpit:7412@localhost:5432/Rajposh"
```

## Setup Instructions

### 1. Create the Database

```sql
CREATE DATABASE Rajposh;
```

### 2. Run the Schema

```bash
psql -U Arpit -d Rajposh -f database/schema.sql
```

Or using the connection string:
```bash
psql "postgresql://Arpit:7412@localhost:5432/Rajposh" -f database/schema.sql
```

### 3. Seed the Database

```bash
psql -U Arpit -d Rajposh -f database/seed.sql
```

Or:
```bash
psql "postgresql://Arpit:7412@localhost:5432/Rajposh" -f database/seed.sql
```

## Database Structure

### Tables

1. **categories** - Main product categories (Poshak, Saree, Odhni, Jewellery)
2. **subcategories** - Subcategories for each category
3. **products** - Product information with pricing, stock, sizes, colors
4. **product_images** - Product images with primary image flag
5. **customers** - Customer information
6. **cart** - Shopping cart per customer
7. **cart_items** - Items in shopping cart
8. **orders** - Order information
9. **order_items** - Items in each order

### Key Features

- Foreign key relationships with CASCADE delete where appropriate
- Indexes on frequently searched columns
- Automatic timestamp updates via triggers
- ENUM types for order and payment statuses
- Array support for sizes and colors
- Unique constraints on SKU and customer email

## Sample Data

The seed file includes:
- 4 Categories
- 15 Subcategories
- 40+ Products (10+ per category)
- Sample product images

## Notes

- Update product image URLs in `seed.sql` with actual image paths
- Password hashes in customers table should be properly hashed (bcrypt recommended)
- Adjust stock quantities and prices as needed
- Add more products as your inventory grows

