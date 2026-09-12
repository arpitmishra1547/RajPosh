"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter, X } from "lucide-react";
import productsData from "@/data/products.json";

export default function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedSubcategories,
  setSelectedSubcategories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  currentCategory,
  currentSubcategory,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get unique categories and subcategories
  const categories = [...new Set(productsData.products.map((p) => p.category))];
  
  // Normalize category name for comparison (handle case variations)
  const normalizeCategory = (cat) => {
    if (!cat) return null;
    return cat
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  
  const normalizedCurrentCategory = normalizeCategory(currentCategory);
  
  const subcategories = normalizedCurrentCategory
    ? [
        ...new Set(
          productsData.products
            .filter((p) => p.category === normalizedCurrentCategory)
            .map((p) => p.subcategory)
        ),
      ]
    : [
        ...new Set(productsData.products.map((p) => p.subcategory)),
      ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: Number(value) || 0,
    }));
  };

  // Calculate max price from products
  const maxPrice = Math.max(...productsData.products.map((p) => p.price), 100000);
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange({ min: 0, max: maxPrice });
    setSortBy("default");
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">CATEGORY</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategory Filter */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            SUBCATEGORY
          </h3>
          <div className="space-y-2">
            {subcategories.map((subcategory) => (
              <div key={subcategory} className="flex items-center space-x-2">
                <Checkbox
                  id={`subcategory-${subcategory}`}
                  checked={selectedSubcategories.includes(subcategory)}
                  onCheckedChange={() => handleSubcategoryChange(subcategory)}
                />
                <Label
                  htmlFor={`subcategory-${subcategory}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {subcategory}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">PRICE</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="price-min" className="text-sm text-gray-700">
              FROM:
            </Label>
            <Input
              id="price-min"
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              className="w-full"
              placeholder="₹ 0"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="price-max" className="text-sm text-gray-700">
              TO:
            </Label>
            <Input
              id="price-max"
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              className="w-full"
              placeholder="₹ 4000"
            />
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">SORT BY</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b99b77]"
        >
          <option value="default">Best selling</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={resetFilters}
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="lg:hidden mb-4">
            <Filter className="w-4 h-4 mr-2" />
            FILTER
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-80">
          <div className="p-6 overflow-y-auto h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            {filterContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 pr-6">
      <div className="sticky top-24 space-y-6">{filterContent}</div>
    </aside>
  );
}

