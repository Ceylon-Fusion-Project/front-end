import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
//import DiscoverMoreDetails from "../components/DiscoverMoreDetails";
import ProductAccordion from "../components/ProductAccordion";
import { CustomerReviews } from "@/components/CustomerReviews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductInfo } from "@/components/ProductInfo";

// interface ProductOrigin {
//   originID: number;
//   stateLocation: string;
//   stateMapLink: string;
//   partOfPlant: string;
//   originDescription: string;
//   factoryName: string;
//   factoryAddress: string;
//   factoryMapLink: string;
//   demoVideoLink: string;
//   originCode: string;
// }
// interface Certification {
//   certificationName: string;
//   issuer: string;
//   certURL: string;
// }

// interface ProductRating {
//   productRatingID: number;
//   customer: number;
//   productRating: number;
//   productReview: string;
//   createdDate: string;
//   updatedDate: string;
// }
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

  const averageRating =
    product.productRatingValue === 0 && product.productRatingList.length > 0
      ? product.productRatingList.reduce((acc, review) => acc + review.productRating, 0) /
        product.productRatingList.length
      : product.productRatingValue;

  return (
    <>
    <section className="mt-5 space-y-2 px-1 lg:px-4 container mx-auto pt-16">
      {/* Navigation Bar */}
      <section className="snap-start">
        <Navbar />
      </section>
      <section className="mt-2 space-y-2">
      <section className="grid grid-cols-1 lg:flex lg:space-x-8">
      {/* Pass Product Image Gallery */}
    <div className="lg:w-1/2 flex flex-col">
      <ProductGallery images={product.productImageURLs} />
    </div>

      {/* Product Information */}
    <div className="lg:w-1/2 flex flex-col justify-between">
      <ProductInfo
        name={product.productName}
        brand={product.productOrigin?.factoryName || product.productOrigin?.stateLocation || "Unknown Brand"}
        rating={averageRating}
        reviewCount={product.productRatingList.length}
        price={product.sellingPrice}
        originalPrice={product.sellingPrice * 1.2}
        description={product.productDescription}
      />
    </div>
      </section>
      
      {/* ✅ Pass Product Description to Component
      <DiscoverMoreDetails
        nutrition={product.productDescription || "No description available"}
      /> */}

      {/* Pass Product Details to Component */}
      <ProductAccordion
        certificationList={product.certificationList}
        productOrigin={product.productOrigin}
      />
      
      {/* Pass Customer Reviews */}
      <CustomerReviews productRatingList={product.productRatingList} />

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        ← Back
      </button>
      </section>
    </section>
    {/* Footer */}
    <section className="snap-start pt-4">
    <Footer />
  </section>
    </>
  );
}
