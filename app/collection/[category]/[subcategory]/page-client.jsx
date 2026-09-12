"use client";

import { useState, useMemo } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";

export default function SubcategoryPageClient({ products: initialProducts, category, subcategory, maxPrice }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category?.name || p.category)
      );
    }

    // Filter by selected subcategories
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSubcategories.includes(p.subcategory?.name || p.subcategory)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => Number(p.price) >= priceRange.min && Number(p.price) <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name-asc":
        filtered.sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => (b.name || b.title).localeCompare(a.name || a.title));
        break;
      default:
        // Best selling (default order)
        break;
    }

    return filtered;
  }, [initialProducts, selectedCategories, selectedSubcategories, priceRange, sortBy]);

  const formatUrl = (str) => {
    return str?.toLowerCase().replace(/\s+/g, "-") || "";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-[#b99b77]">
            Home
          </a>
          {" / "}
          <a
            href={`/collection/${formatUrl(category)}`}
            className="hover:text-[#b99b77] capitalize"
          >
            {category}
          </a>
          {" / "}
          <span className="text-gray-900 capitalize">{subcategory}</span>
        </nav>
        <h1 className="text-3xl font-semibold text-gray-900 capitalize">
          {subcategory}
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
          currentSubcategory={subcategory}
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




