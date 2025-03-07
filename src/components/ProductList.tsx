// import React, { useState } from "react";
// import Card from "./Card";
// // import ProductsData from "./ProductsData";

// interface Product {
//   productID: number;
//   productName: string;
//   productDescription: string;
//   sellingPrice: number;
//   productImageURL: string;
// }

// interface ProductListProps {
//   products: Product[];
// }

// const itemsPerPage = 6;

// const ProductList: React.FC<ProductListProps> = ({ products }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   // Slice products based on pagination
//   const paginatedProducts = products.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container p-6 mx-auto">
//       {/* Display message if no products found */}
//       {products.length === 0 ? (
//         <p className="text-center">No products found</p>
//       ) : (
//         <>
//           {/* Products Grid */}
//           <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
//             {paginatedProducts.map((product: Product) => (
//               <Card
//                 key={product.productID}
//                 image={product.productImageURL}
//                 title={product.productName}
//                 description={product.productDescription}
//                 price={`$${product.sellingPrice}`}
//                 productID={product.productID} 
//                 onClick={() => alert(`Quick Buy: ${product.productName}`)}
//                 isFeatured={false}
//               />
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 className="px-4 py-2 bg-gray-200 w-[100px] rounded-l disabled:opacity-50"
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>

//               <span className="px-4 py-2 text-white bg-black border rounded-sm">
//                 {currentPage} / {totalPages}
//               </span>

//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 className="px-4 py-2 bg-gray-200 w-[100px] rounded-r disabled:opacity-50"
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductList;

// import React, { useEffect, useState } from "react";
// import api from "../api/axiosInstance";
// import Card from "./Card";
// import axios from "axios";

// interface Product {
//   productID: number;
//   productName: string;
//   productDescription: string;
//   sellingPrice: number;
//   productImageURL: string;
// }

// interface ProductListProps {
//   searchQuery: string;
//   sortOption: string;
//   filters: any;
//   page: number;
//   setPage: (page: number) => void;
//   size: number;
//   setSize: (size: number) => void;
// }

// const ProductList: React.FC<ProductListProps> = ({ searchQuery, sortOption, filters, page, setPage, size }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const params = {
//         activeStatus: true,
//         sort: sortOption,
//         page,
//         size,
//         productName: searchQuery || undefined,
//         ...filters,
//       };

//       const response = await api.get("/product/get-product-by-filtering", { params });

//       console.log("✅ API Response:", response.data);

//       // Extracting Data Correctly
//       const fetchedProducts = response?.data?.data?.data?.productGetAllResponseDTOS || [];
//       const totalItemsCount = response?.data?.data?.totalItems ?? 0;

//       if (Array.isArray(fetchedProducts)) {
//         setProducts(fetchedProducts);
//         setTotalItems(totalItemsCount);
//       } else {
//         console.error("❌ Unexpected data structure:", response.data);
//         setError("Invalid data format received from API.");
//       }
//     } catch (err: unknown) {
//       console.error("❌ Error fetching products:", err);
//       if (axios.isAxiosError(err)) {
//         console.error("Server Response Data:", err.response?.data);
//         console.error("Status Code:", err.response?.status);
//       } else if (err instanceof Error) {
//         console.error("Error Message:", err.message);
//       } else {
//         console.error("Unexpected error:", err);
//       }
//       setError("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [searchQuery, sortOption, filters, page, size]);

//   const totalPages = Math.ceil(totalItems / size);

//   return (
//     <div className="container p-6 mx-auto">
//       {loading ? (
//         <p className="text-center">Loading products...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : products.length === 0 ? (
//         <p className="text-center">No products found</p>
//       ) : (
//         <>
//           {/* Products Grid */}
//           <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
//             {products.map((product) => (
//               <Card
//                 key={product.productID}
//                 image={product.productImageURL}
//                 title={product.productName}
//                 description={product.productDescription}
//                 price={`$${product.sellingPrice}`}
//                 productID={product.productID}
//                 onClick={() => alert(`Quick Buy: ${product.productName}`)}
//                 isFeatured={false}
//               />
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 className="px-4 py-2 bg-gray-200 w-[100px] rounded-l disabled:opacity-50"
//                 disabled={page === 0}
//               >
//                 Previous
//               </button>

//               <span className="px-4 py-2 text-white bg-black border rounded-sm">
//                 Page {page + 1} of {totalPages}
//               </span>

//               <button
//                 onClick={() => setPage(page + 1)}
//                 className="px-4 py-2 bg-gray-200 w-[100px] rounded-r disabled:opacity-50"
//                 disabled={page >= totalPages - 1}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Card from "./Card";
import axios from "axios";

interface Product {
  productID: number;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  productImageURL: string;
}

interface ProductListProps {
  searchQuery: string;
  sortOption: string;
  filters: any;
  page: number;
  setPage: (page: number) => void;
  size: number;
  setSize: (size: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  searchQuery,
  sortOption,
  filters,
  page,
  setPage,
  size,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = "/product/get-all-products"; // Default to fetching all products
      let params: any = {
        activeStatus: true,
        sort: sortOption,
        page,
        size,
      };

      // If filters are applied, switch to filtering endpoint
      if (searchQuery || Object.keys(filters).length > 0) {
        endpoint = "/product/get-product-by-filtering";
        params = {
          ...params,
          productName: searchQuery || undefined,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          averageRating: filters.averageRating,
          startDate: filters.startDate,
          endDate: filters.endDate,
        };
      }

      const response = await api.get(endpoint, { params });

      console.log("API Response:", response.data);

      // Corrected Data Extraction
      const fetchedProducts = response?.data?.data?.data?.productGetAllResponseDTOS;

      if (Array.isArray(fetchedProducts)) {
        setProducts(fetchedProducts);
        setTotalItems(response.data.data.data.totalItems || 0);
      } else {
        console.error("Unexpected data structure:", response.data);
        setError("Invalid data format from API.");
      }
    } catch (err: unknown) {
      console.error("Error fetching products:", err);
      if (axios.isAxiosError(err)) {
        console.error("Server Response Data:", err.response?.data);
        console.error("Status Code:", err.response?.status);
      } else if (err instanceof Error) {
        console.error("Error Message:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, sortOption, filters, page, size]); // Fetch when these dependencies change

  const totalPages = Math.ceil(totalItems / size);

  return (
    <div className="container p-6 mx-auto">
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.productID}
                image={product.productImageURL}
                title={product.productName}
                description={product.productDescription}
                price={`$${product.sellingPrice}`}
                productID={product.productID}
                onClick={() => alert(`Quick Buy: ${product.productName}`)}
                isFeatured={false}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2 text-[#352715] ">
            {/* Previous Button */}
            <button
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-[#c9a575] rounded disabled:opacity-50 hover:bg-[#d9c09e]"
              disabled={page === 0}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-3 py-2 rounded ${page === i ? "bg-[#7b5b30] text-white hover:bg-[#d9c09e] hover:text-[#352715]" : "bg-[#c9a575] hover:bg-[#d9c09e]"}`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-[#c9a575] rounded disabled:opacity-50 hover:bg-[#d9c09e]"
              disabled={page >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
