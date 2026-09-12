"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, primaryImageUrl }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatUrl = (str) => {
    return str.toLowerCase().replace(/\s+/g, "-");
  };

  // Use primary image from database or fallback
  const imageUrl = primaryImageUrl || product.primaryImageUrl || product.images?.[0] || "/beautiful-silk-saree-traditional-indian.jpg";

  return (
    <Link
      href={`/collection/${formatUrl(product.category?.name || product.category)}/${formatUrl(product.subcategory?.name || product.subcategory)}/${product.id}`}
      className="group"
    >
      <div className="relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-[#b99b77] transition-colors">
            {product.name || product.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            {product.subcategory?.name || product.subcategory}
          </p>
          <p className="text-lg font-semibold text-[#b99b77]">
            {formatPrice(Number(product.price))}
          </p>
        </div>
      </div>
    </Link>
  );
}
