"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

export default function ProductGrid({ products, itemsPerPage = 15 }) {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + itemsPerPage);
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            primaryImageUrl={product.primaryImageUrl}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={handleLoadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
