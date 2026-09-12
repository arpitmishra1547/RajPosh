import { prisma } from "@/lib/prisma";
import { getPrimaryImage } from "@/lib/images";
import SubcategoryPageClient from "./page-client";
import productsData from "@/data/products.json";

export default async function SubcategoryPage({ params }) {
  // Format category/subcategory name from URL
  const formatName = (str) => {
    if (!str) return null;
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  
  const categoryName = formatName(params.category);
  const subcategoryName = formatName(params.subcategory);

  // Try to fetch from database first
  let products = [];
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: categoryName,
          mode: 'insensitive',
        },
      },
      include: {
        subcategories: {
          where: {
            name: {
              equals: subcategoryName,
              mode: 'insensitive',
            },
          },
        },
      },
    });

    if (category && category.subcategories.length > 0) {
      const subcategory = category.subcategories[0];
      products = await prisma.product.findMany({
        where: {
          categoryId: category.id,
          subcategoryId: subcategory.id,
        },
        include: {
          category: true,
          subcategory: true,
        },
      });

      // Fetch primary images for all products
      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          const primaryImageUrl = await getPrimaryImage(product.id);
          return {
            ...product,
            primaryImageUrl,
          };
        })
      );
      products = productsWithImages;
    }
  } catch (error) {
    console.error("Error fetching products from database:", error);
  }

  // Fallback to JSON data if database is empty
  if (products.length === 0) {
    products = productsData.products
      .filter((p) => {
        const matchesCategory = categoryName
          ? p.category.toLowerCase() === categoryName.toLowerCase()
          : true;
        const matchesSubcategory = subcategoryName
          ? p.subcategory.toLowerCase() === subcategoryName.toLowerCase()
          : true;
        return matchesCategory && matchesSubcategory;
      })
      .map((p) => ({
        id: p.id,
        name: p.title,
        title: p.title,
        category: { name: p.category },
        subcategory: { name: p.subcategory },
        price: p.price,
        primaryImageUrl: p.images?.[0],
      }));
  }

  // Calculate max price
  const maxPrice = products.length > 0
    ? Math.max(...products.map((p) => Number(p.price)), 100000)
    : 100000;

  return (
    <SubcategoryPageClient
      products={products}
      category={categoryName}
      subcategory={subcategoryName}
      maxPrice={maxPrice}
    />
  );
}
