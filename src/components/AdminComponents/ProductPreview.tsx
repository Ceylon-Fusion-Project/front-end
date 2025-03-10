// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ArrowLeft } from "lucide-react";
// import { categoryTypes, measuringUnitTypes, origins } from "@/lib/data";

// interface Product {
//   productCode?: string;
//   productName?: string;
//   productDescription?: string;
//   sellingPrice?: number;
//   categoryType?: string;
//   measuringUnitType?: string;
//   productOrigin?: number;
//   productImageURLs?: string[];
// }

// interface ProductPreviewProps {
//   product: Product;
//   onBack: () => void;
// }

// export function ProductPreview({ product, onBack }: ProductPreviewProps) {
//   const getCategoryLabel = (value?: string): string => {
//     return categoryTypes.find((cat) => cat.value === value)?.label || "Unknown";
//   };

//   const getUnitLabel = (value?: string): string => {
//     return measuringUnitTypes.find((unit) => unit.value === value)?.label || "Unknown";
//   };

//   const getOriginName = (id?: number): string => {
//     return origins.find((origin) => origin.id === id)?.name || "Unknown";
//   };

//   return (
//     <div className="bg-white rounded-lg overflow-hidden p-6 border border-gray-200 shadow-md">
//       <div className="flex items-center mb-6">
//         <Button variant="ghost" onClick={onBack} className="p-0 mr-2">
//           <ArrowLeft className="h-5 w-5" />
//         </Button>
//         <h3 className="text-xl font-semibold">Product Preview</h3>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           {product.productImageURLs && product.productImageURLs.length > 0 ? (
//             <div>
//               <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 mb-4">
//                 <img
//                   src={product.productImageURLs?.[0] || "/placeholder.svg"}
//                   alt={product.productName || "Product Image"}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {product.productImageURLs.length > 1 && (
//                 <div className="grid grid-cols-4 gap-2">
//                   {product.productImageURLs.slice(0, 4).map((url, i) => (
//                     <div key={i} className="aspect-square rounded-md overflow-hidden border border-gray-200">
//                       <img
//                         src={url || "/placeholder.svg"}
//                         alt={`${product.productName || "Product"} thumbnail ${i + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center h-48">
//               <p className="text-gray-400">No images available</p>
//             </div>
//           )}
//         </div>

//         <div className="space-y-6">
//           <div>
//             <div className="flex items-center justify-between">
//               <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
//                 {product.productCode || "No Code"}
//               </Badge>
//               <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
//                 {getCategoryLabel(product.categoryType)}
//               </Badge>
//             </div>
//             <h1 className="text-2xl font-bold mt-2">{product.productName || "Untitled Product"}</h1>
//             <div className="flex items-center mt-1 space-x-2">
//               <Badge variant="secondary">{getOriginName(product.productOrigin)}</Badge>
//               <Badge variant="secondary">{getUnitLabel(product.measuringUnitType)}</Badge>
//             </div>
//           </div>

//           <div className="text-3xl font-bold text-amber-800">
//             ${product.sellingPrice?.toFixed(2) || "0.00"}
//           </div>

//           <div>
//             <h3 className="text-lg font-medium mb-2">Description</h3>
//             <p className="text-gray-700 whitespace-pre-line">
//               {product.productDescription || "No description provided."}
//             </p>
//           </div>

//           <div className="pt-4">
//             <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white">Add to Cart</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/ProductPreview.tsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import { categoryTypes, measuringUnitTypes, origins } from "../../lib/data";

interface ProductPreviewProps {
  product: {
    productCode?: string;
    productName?: string;
    productDescription?: string;
    sellingPrice?: number;
    categoryType?: string;
    measuringUnitType?: string;
    productOrigin?: number;
    productImageURLs?: string[];
  };
  onBack: () => void;
}

export function ProductPreview({ product, onBack }: ProductPreviewProps) {
  const getCategoryLabel = (value?: string) => {
    return categoryTypes.find((cat) => cat.value === value)?.label || "Unknown";
  };

  const getUnitLabel = (value?: string) => {
    return measuringUnitTypes.find((unit) => unit.value === value)?.label || "Unknown";
  };

  const getOriginName = (id?: number) => {
    return origins.find((origin) => origin.id === id)?.name || "Unknown";
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 shadow-md">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-1 text-gray-600 flex items-center">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        <h3 className="text-xl font-semibold ml-4">Product Preview</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Product Images */}
        <div>
          {product.productImageURLs && product.productImageURLs.length > 0 ? (
            <div>
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 mb-4">
                <img
                  src={product.productImageURLs[0] || "/placeholder.svg"}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.productImageURLs.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.productImageURLs.slice(1, 5).map((url, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md overflow-hidden border border-gray-200"
                    >
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`${product.productName} thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center h-48">
              <p className="text-gray-400">No images available</p>
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="border border-amber-200 bg-amber-50 text-amber-700 px-2 py-1 rounded">
              {product.productCode || "No Code"}
            </span>
            <span className="border border-green-200 bg-green-50 text-green-700 px-2 py-1 rounded">
              {getCategoryLabel(product.categoryType)}
            </span>
          </div>

          <h1 className="text-2xl font-bold">
            {product.productName || "Untitled Product"}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="border border-gray-300 px-2 py-1 rounded bg-gray-100">
              {getOriginName(product.productOrigin)}
            </span>
            <span className="border border-gray-300 px-2 py-1 rounded bg-gray-100">
              {getUnitLabel(product.measuringUnitType)}
            </span>
          </div>

          <div className="text-3xl font-bold text-amber-800">
            $
            {typeof product.sellingPrice === "number"
              ? product.sellingPrice.toFixed(2)
              : Number.parseFloat(String(product.sellingPrice || 0)).toFixed(2)}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {product.productDescription || "No description provided."}
            </p>
          </div>

          <div className="pt-4">
            <button className="w-full bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
