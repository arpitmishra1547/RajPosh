"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductImageUpload() {
  const [category, setCategory] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [productId, setProductId] = useState("");
  const [mainImages, setMainImages] = useState([]);
  const [extraImages, setExtraImages] = useState([]);
  const [mainPreviews, setMainPreviews] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const categories = [
    { value: "poshak", label: "Poshak" },
    { value: "saree", label: "Saree" },
    { value: "odhni", label: "Odhni" },
    { value: "jewellery", label: "Jewellery" },
  ];

  // Handle main images selection
  const handleMainImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setMainImages(files);

    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setMainPreviews(previews);
  };

  // Handle extra images selection
  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setExtraImages(files);

    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setExtraPreviews(previews);
  };

  // Remove main image
  const removeMainImage = (index) => {
    const newImages = mainImages.filter((_, i) => i !== index);
    const newPreviews = mainPreviews.filter((_, i) => i !== index);
    setMainImages(newImages);
    setMainPreviews(newPreviews);
    
    // Revoke object URLs
    URL.revokeObjectURL(mainPreviews[index]);
  };

  // Remove extra image
  const removeExtraImage = (index) => {
    const newImages = extraImages.filter((_, i) => i !== index);
    const newPreviews = extraPreviews.filter((_, i) => i !== index);
    setExtraImages(newImages);
    setExtraPreviews(newPreviews);
    
    // Revoke object URLs
    URL.revokeObjectURL(extraPreviews[index]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUploadResult(null);

    if (!category || !productSlug) {
      setError("Please select category and enter product slug");
      return;
    }

    if (mainImages.length === 0 && extraImages.length === 0) {
      setError("Please select at least one image to upload");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("productSlug", productSlug);
      if (productId) {
        formData.append("productId", productId);
      }

      // Append main images
      mainImages.forEach((file) => {
        formData.append("mainImages[]", file);
      });

      // Append extra images
      extraImages.forEach((file) => {
        formData.append("extraImages[]", file);
      });

      const response = await fetch("/api/upload-product", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadResult(data);
      
      // Reset form
      setMainImages([]);
      setExtraImages([]);
      setMainPreviews([]);
      setExtraPreviews([]);
      
      // Revoke all object URLs
      mainPreviews.forEach(url => URL.revokeObjectURL(url));
      extraPreviews.forEach(url => URL.revokeObjectURL(url));
    } catch (err) {
      setError(err.message || "Failed to upload images");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Upload Product Images
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <Label htmlFor="category" className="text-sm font-semibold text-gray-900">
            Category *
          </Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b99b77]"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Slug */}
        <div>
          <Label htmlFor="productSlug" className="text-sm font-semibold text-gray-900">
            Product Slug *
          </Label>
          <Input
            id="productSlug"
            type="text"
            value={productSlug}
            onChange={(e) => setProductSlug(e.target.value)}
            placeholder="e.g., dailywear-pink-poshak-001"
            required
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            This will be used in the Cloudinary path: rajposh/{category}/{"{slug}"}/
          </p>
        </div>

        {/* Product ID (Optional) */}
        <div>
          <Label htmlFor="productId" className="text-sm font-semibold text-gray-900">
            Product ID (Optional)
          </Label>
          <Input
            id="productId"
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Leave empty to search by slug"
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            If provided, images will be linked to this product ID. Otherwise, product will be searched by slug.
          </p>
        </div>

        {/* Main Images */}
        <div>
          <Label htmlFor="mainImages" className="text-sm font-semibold text-gray-900">
            Main Images (6-9 photos) *
          </Label>
          <Input
            id="mainImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleMainImagesChange}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            These images will be used on the product detail page and gallery
          </p>

          {/* Main Image Previews */}
          {mainPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {mainPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Main ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md border border-gray-300"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-[#b99b77] text-white text-xs px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeMainImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Extra Images */}
        <div>
          <Label htmlFor="extraImages" className="text-sm font-semibold text-gray-900">
            Extra Images (3-5 photos)
          </Label>
          <Input
            id="extraImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleExtraImagesChange}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            These images will be used for cart preview, recommendations, and frequently bought together
          </p>

          {/* Extra Image Previews */}
          {extraPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {extraPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Extra ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeExtraImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {uploadResult && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm font-semibold text-green-800 mb-2">
              ✓ {uploadResult.message}
            </p>
            <p className="text-xs text-green-700">
              Product ID: {uploadResult.productId}
            </p>
            <div className="mt-2">
              <p className="text-xs font-semibold text-green-800">Uploaded Images:</p>
              <ul className="mt-1 text-xs text-green-700 space-y-1">
                {uploadResult.images.map((img, idx) => (
                  <li key={idx}>
                    {img.type} - {img.public_id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#b99b77] text-white hover:bg-[#a88a66]"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </Button>
      </form>
    </div>
  );
}




