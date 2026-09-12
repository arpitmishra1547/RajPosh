import ProductImageUploader from "@/components/admin/ProductImageUploader";

export const metadata = {
  title: "Upload Product Images - Rajposh Admin",
  description: "Upload product images to Cloudinary",
};

export default function AdminUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ProductImageUploader />
      </div>
    </div>
  );
}
