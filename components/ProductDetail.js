"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart, ZoomIn } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product, images = { main: [], extra: [] } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  // Use database images if available, otherwise fallback to product.images
  const mainImages = images.main && images.main.length > 0 
    ? images.main.map(img => img.imageUrl)
    : (product.images || []);

  const extraImages = images.extra && images.extra.length > 0
    ? images.extra.map(img => img.imageUrl)
    : [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    // Show success message for 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image with Zoom */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group cursor-zoom-in">
            <Image
              src={
                mainImages[selectedImageIndex] ||
                mainImages[0] ||
                "/beautiful-silk-saree-traditional-indian.jpg"
              }
              alt={product.name || product.title}
              fill
              className={`object-cover transition-transform duration-300 ${
                isZoomed ? "scale-150" : "group-hover:scale-110"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onClick={() => setIsZoomed(!isZoomed)}
            />
            <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-5 h-5" />
            </div>
          </div>

          {/* Main Image Thumbnails */}
          {mainImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {mainImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsZoomed(false);
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? "border-[#b99b77]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/beautiful-silk-saree-traditional-indian.jpg"}
                    alt={`${product.name || product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Extra Images Section */}
          {extraImages.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Additional Views
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {extraImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-md border border-gray-200"
                  >
                    <Image
                      src={image}
                      alt={`Extra view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 10vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <a href="/" className="hover:text-[#b99b77]">
              Home
            </a>
            {" / "}
            <span className="text-gray-900">
              {product.category?.name || product.category}
            </span>
          </nav>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {product.name || product.title}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-semibold text-[#b99b77]">
              {formatPrice(Number(product.price))}
            </p>
            {product.discountPrice && (
              <p className="text-xl text-gray-400 line-through">
                {formatPrice(Number(product.discountPrice))}
              </p>
            )}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full transition-colors ${
                isWishlisted
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Tax included. Shipping calculated at checkout.
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="text-sm text-gray-700">
              {product.stockQuantity > 0
                ? `In stock (${product.stockQuantity} available)`
                : "Out of stock"}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleAddToCart}
              className={`w-full text-white transition-all ${
                addedToCart
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-white border-2 border-black text-black hover:bg-gray-100'
              }`}
              size="lg"
            >
              {addedToCart ? '✓ Added to Cart' : 'ADD TO CART'}
            </Button>
            <Button
              onClick={handleBuyNow}
              className="w-full bg-[#b99b77] text-white hover:bg-[#a88a66]"
              size="lg"
            >
              BUY IT NOW
            </Button>
          </div>

          {/* Description Toggle */}
          <details className="border-t border-gray-200 pt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-900 flex items-center justify-between">
              <span>DESCRIPTION</span>
              <svg
                className="w-4 h-4 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </details>

          {/* Social Sharing */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-700">Share:</span>
            <button className="text-sm text-blue-600 hover:underline">
              f Share
            </button>
            <button className="text-sm text-gray-900 hover:underline">
              X Share
            </button>
            <button className="text-sm text-red-600 hover:underline">
              Pin it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
