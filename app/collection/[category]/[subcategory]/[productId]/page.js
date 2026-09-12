import ProductDetail from "@/components/ProductDetail";
import { getProductWithImages } from "@/lib/images";
import productsData from "@/data/products.json";

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.productId);

  // Try to get product from database first
  let product = null;
  let images = { main: [], extra: [] };

  try {
    // Attempt to query database only if DATABASE_URL is set
    if (process.env.DATABASE_URL) {
      product = await getProductWithImages(productId);
      if (product) {
        // Separate main and extra images
        images = {
          main: product.images?.filter(img => img.type === 'main') || [],
          extra: product.images?.filter(img => img.type === 'extra') || [],
        };
      }
    }
  } catch (error) {
    // Log the error but don't crash - fallback to JSON data
    console.warn("Database query failed, using JSON fallback:", error.message);
  }

  // Fallback to JSON data if not in database or DB error
  if (!product) {
    const jsonProduct = productsData.products.find((p) => p.id === productId.toString());
    if (jsonProduct) {
      product = {
        id: jsonProduct.id,
        name: jsonProduct.title,
        title: jsonProduct.title,
        description: jsonProduct.description,
        price: jsonProduct.price,
        discountPrice: null,
        stockQuantity: jsonProduct.inStock ? 100 : 0,
        category: { name: jsonProduct.category },
        subcategory: { name: jsonProduct.subcategory },
      };
      // Use images from JSON data
      images = {
        main: jsonProduct.images?.map((url, idx) => ({
          id: idx,
          imageUrl: url,
          type: 'main',
          isPrimary: idx === 0,
        })) || [],
        extra: [],
      };
    }
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <a
            href="/"
            className="text-[#b99b77] hover:underline"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} images={images} />;
}
