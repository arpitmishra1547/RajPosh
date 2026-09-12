"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import productsData from "@/data/products.json";

export default function CategoryPage() {
  const params = useParams();
  
  // Format category name from URL
  const formatCategoryName = (str) => {
    if (!str) return null;
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  
  const category = formatCategoryName(params.category);

  // Calculate max price from products
  const maxPrice = Math.max(...productsData.products.map((p) => p.price), 100000);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = productsData.products;

    // Filter by current category (if category param exists)
    if (category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      products = products.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Filter by selected subcategories
    if (selectedSubcategories.length > 0) {
      products = products.filter((p) =>
        selectedSubcategories.includes(p.subcategory)
      );
    }

    // Filter by price range
    products = products.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        products.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Best selling (default order)
        break;
    }

    return products;
  }, [
    category,
    selectedCategories,
    selectedSubcategories,
    priceRange,
    sortBy,
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-[#b99b77]">
            Home
          </a>
          {" / "}
          <span className="text-gray-900 capitalize">{category || "Collection"}</span>
        </nav>
        <h1 className="text-3xl font-semibold text-gray-900 capitalize">
          {category || "Collection"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedSubcategories={selectedSubcategories}
          setSelectedSubcategories={setSelectedSubcategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          currentCategory={category}
          currentSubcategory={null}
        />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <ProductGrid products={filteredProducts} itemsPerPage={15} />
        </div>
      </div>
    </div>
  );
}

