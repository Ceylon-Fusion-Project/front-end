import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Card from "./Card";
import axios from "axios";
import { Box,IconButton,Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface Product {
  productID: number;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  productImageURL: string;
}

interface ProductListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  filters: any;
  setFilters: (filters: any) => void; 
  page: number;
  setPage: (page: number) => void;
  size: number;
  setSize: (size: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  filters,
  setFilters,
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
          category: filters.category,
          activeStatus: filters.activeStatus,
        };
      }
      //Check filters
      console.log("ULR:"+endpoint, { params });
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

  const clearAllFilters = () => {
    setSearchQuery("");
    setPage(0);
    setFilters({});
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
        {(searchQuery ||
            Object.values(filters).some(
              (value) => value !== undefined && value !== ""
            )) && (
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {searchQuery && (
                <Box
                  component="span"
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "#E2E8F0",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Search: "{searchQuery}"
                  <IconButton size="small" onClick={() => setSearchQuery("")}>
                    <Delete fontSize="small" style={{ color: "#64748B" }} />
                  </IconButton>
                </Box>
              )}
              {Object.entries(filters).map(
                ([key, value]) =>
                  value !== undefined &&
                  value !== "" && (
                    <Box
                      key={key}
                      component="span"
                      sx={{
                        px: 2,
                        py: 1,
                        bgcolor: "#E2E8F0",
                        borderRadius: "16px",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {key}: {String(value)}
                      <IconButton
                        size="small"
                        onClick={() =>
                          setFilters((prev: typeof filters) => ({
                            ...prev,
                            [key]: undefined,
                          }))
                        }
                      >
                        <Delete fontSize="small" style={{ color: "#64748B" }} />
                      </IconButton>
                    </Box>
                  )
              )}
              <Button
                size="small"
                onClick={clearAllFilters}
                style={{ color: "#3B82F6" }}
              >
                Clear all
              </Button>
            </Box>
          )}
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
