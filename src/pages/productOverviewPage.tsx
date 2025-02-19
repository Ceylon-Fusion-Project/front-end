import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
//import DiscoverMoreDetails from "../components/DiscoverMoreDetails";
import ProductAccordion from "../components/ProductAccordion";

interface ProductDetails {
  productID: number;
  productCode: string;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  categoryType: string;
  measuringUnitType: string;
  productImageURLs: string[];
  productRatingValue: number;
  certificationList: any[];
  productRatingList: any[];
  productOrigin: any;
}

// Define API Response Type
interface ApiResponse<T> {
  message: string;
  data: {
    code: number;
    message: string;
    data: T;
  };
}

export function ProductOverviewPage() {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ApiResponse<ProductDetails>>(`/product/get-product-details-by-id?id=${id}`)
      .then((response) => {
          // Extract Correct Product Data
          const productData = response.data.data.data;
          if (productData) {
              setProduct(productData);
          } else {
              setError("Product details not found.");
          }
      })
      .catch((error) => {
          setError("Failed to load product details.");
          console.error("❌ API Error:", error);
          
          if (error.response) {
              console.error("Server Response Data:", error.response.data);
              console.error("Status Code:", error.response.status);
              console.error("Headers:", error.response.headers);
          } else if (error.request) {
              console.error("No response received:", error.request);
          } else {
              console.error("Request setup error:", error.message);
          }
      })
      .finally(() => {
          setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!product) return <p>Product details not found.</p>;

  console.log("✅ Rendering Product:", product);

  return (
    <section className="mt-12 space-y-6">
      
      {/* ✅ Pass Product Description to Component
      <DiscoverMoreDetails
        nutrition={product.productDescription || "No description available"}
      /> */}

      {/* ✅ Pass Product Details to Component */}
      <ProductAccordion
        certificationList={product.certificationList}
        productOrigin={product.productOrigin}
      />

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        ← Back
      </button>
    </section>
  );
}
