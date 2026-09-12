# RajPosh

RajPosh is a full-stack e-commerce web application built for showcasing and selling traditional Indian ethnic wear and jewellery.

The application provides a modern shopping experience with product collections, product details, cart and checkout functionality, user authentication, account management, and an admin interface for managing product images.

## Live Demo

waiting for deployment..........

## GitHub

https://github.com/arpitmishra1547/RajPosh

---

## Features

### Customer Features

- Browse products by category and subcategory
- Dynamic product listing pages
- Product detail pages
- Product image gallery
- Add products to cart
- Update and remove cart items
- Checkout flow
- User registration and login
- User profile/account management
- Protected account functionality
- Responsive design for desktop and mobile devices

### Admin Features

- Admin product image upload interface
- Upload multiple product images
- Separate main and extra image groups
- Product image organization by category and product slug
- Automatic primary image selection
- Cloudinary-based image storage
- Product image management through API routes

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- Authentication API routes
- Protected user profile functionality

---

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- GSAP
- React Icons

### Backend

- Next.js App Router
- Next.js API Routes
- REST-style API endpoints

### Database

- PostgreSQL
- Prisma ORM

### Image Management

- Cloudinary
- Server-side image upload
- Organized image storage structure

### Tools

- Git
- GitHub
- npm

---

## Application Architecture

```text
                    RajPosh
                       |
        +--------------+--------------+
        |                             |
    Customer                       Admin
        |                             |
   +----+----+                  Product Images
   |         |                       |
Products   Account               Upload API
   |         |                       |
Cart      Authentication          Cloudinary
   |         |
Checkout  User Profile
   |
Database
   |
PostgreSQL
   |
Prisma ORM
