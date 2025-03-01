import React, { useState } from "react";
import Card from "./Card";
// import ProductsData from "./ProductsData";

interface Product {
  productID: number;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  productImageURL: string;
}

interface ProductListProps {
  products: Product[];
}

const itemsPerPage = 6;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice products based on pagination
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container p-6 mx-auto">
      {/* Display message if no products found */}
      {products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product: Product) => (
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
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-200 w-[100px] rounded-l disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="px-4 py-2 text-white bg-black border rounded-sm">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 bg-gray-200 w-[100px] rounded-r disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
