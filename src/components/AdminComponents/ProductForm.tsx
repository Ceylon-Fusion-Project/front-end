// src/components/ProductForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUploader } from "./ImageUploader";
import { ProductPreview } from "./ProductPreview";
import { categoryTypes, measuringUnitTypes, origins } from "../../lib/data";
import { saveProduct, updateProduct } from "@/services/productService";
import LoadingOverlay from "../LoadingOverlay";
import NotificationService from "@/utils/NotificationService";
//import { handleAxiosError } from "@/api/handleAxiosError";
//import type { AxiosError } from "axios";

const formSchema = z.object({
  productCode: z.string().min(2, {
    message: "Product code must be at least 2 characters.",
  }),
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  productDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  sellingPrice: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  categoryType: z.string().nonempty("Please select a category."),
  measuringUnitType: z.string().nonempty("Please select a measuring unit."),
  productOrigin: z.coerce.number().min(1, {
    message: "Please select a product origin.",
  }),
  productImageURLs: z.array(z.string()).min(1, {
    message: "At least one product image is required.",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
type ProductWithID = FormValues & { productID?: number };

// Props interface
interface ProductFormProps {
  product: Partial<ProductWithID> | null;
  onSave: (data: FormValues) => void;
  onCancel: () => void;
}

// Main component
export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false); // loading state

  const defaultValues: Partial<FormValues> = {
    productCode: product?.productCode || "",
    productName: product?.productName || "",
    productDescription: product?.productDescription || "",
    sellingPrice: product?.sellingPrice || 0,
    categoryType: product?.categoryType || "",
    measuringUnitType: product?.measuringUnitType || "",
    productOrigin: product?.productOrigin || 0,
    productImageURLs: product?.productImageURLs || [],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Watch all form values to pass them to the preview
  const formValues = form.watch();

  // function onSubmit(values: FormValues) {
  //   console.log("Form Submitted:", values);
  //   alert("Product saved successfully!");
  // }

  function handleSubmit(values: FormValues) {
    // if (product?.productCode) {
    //   // Assume edit mode if there's a product
    //   updateProduct(product.productID!, values)
    //     .then(() => {
    //       alert("Product updated successfully!");
    //       onSave(values); // Let parent know
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert("Failed to update product");
    //     });
    // } else {
    //   saveProduct(values)
    //     .then(() => {
    //       alert("Product saved successfully!");
    //       console.log("Product saved:", values);
    //       onSave(values); // Let parent know
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert("Failed to save product");
    //     });
    // }
    setLoading(true);
    const operation = product?.productCode
      ? updateProduct(product.productID!, values)
      : saveProduct(values);

    operation
      .then(() => {
        NotificationService.success(
          product?.productCode
            ? "Product updated successfully!"
            : "Product saved successfully!"
        );
        onSave(values); // inform parent
      })
      .catch((error) => {
        console.error("response Error123:"+error);
        // handleAxiosError(error); -
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="relative">
      <LoadingOverlay show={loading} />{" "}
      {/* <- This line shows loading animation */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-amber-800">
            {product ? "Edit Product" : "Add New Cinnamon Product"}
          </h2>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="border border-amber-600 px-2 py-1 rounded text-amber-700 hover:bg-amber-50"
          >
            {showPreview ? "Edit Form" : "Preview Product"}
          </button>
        </div>

        {showPreview ? (
          <ProductPreview
            product={formValues}
            onBack={() => setShowPreview(false)}
          />
        ) : (
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Product Code */}
            <div>
              <label className="block font-semibold mb-1">Product Code</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="CIN-001"
                {...form.register("productCode")}
              />
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.productCode?.message}
              </p>
            </div>

            {/* Product Name */}
            <div>
              <label className="block font-semibold mb-1">Product Name</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Ceylon Cinnamon Sticks"
                {...form.register("productName")}
              />
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.productName?.message}
              </p>
            </div>

            {/* Product Description */}
            <div>
              <label className="block font-semibold mb-1">
                Product Description
              </label>
              <textarea
                className="border px-3 py-2 rounded w-full min-h-[120px]"
                placeholder="Premium quality Ceylon cinnamon sticks..."
                {...form.register("productDescription")}
              />
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.productDescription?.message}
              </p>
            </div>

            {/* Selling Price */}
            <div>
              <label className="block font-semibold mb-1">Selling Price</label>
              <input
                type="number"
                step="0.01"
                className="border px-3 py-2 rounded w-full"
                {...form.register("sellingPrice", { valueAsNumber: true })}
              />
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.sellingPrice?.message}
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                className="border px-3 py-2 rounded w-full"
                {...form.register("categoryType")}
              >
                <option value="">Select category</option>
                {categoryTypes.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.categoryType?.message}
              </p>
            </div>

            {/* Measuring Unit */}
            <div>
              <label className="block font-semibold mb-1">Measuring Unit</label>
              <select
                className="border px-3 py-2 rounded w-full"
                {...form.register("measuringUnitType")}
              >
                <option value="">Select unit</option>
                {measuringUnitTypes.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.measuringUnitType?.message}
              </p>
            </div>

            {/* Product Origin */}
            <div>
              <label className="block font-semibold mb-1">Product Origin</label>
              <select
                className="border px-3 py-2 rounded w-full"
                {...form.register("productOrigin", { valueAsNumber: true })}
              >
                <option value={0}>Select origin</option>
                {origins.map((origin) => (
                  <option key={origin.id} value={origin.id}>
                    {origin.name} ({origin.country})
                  </option>
                ))}
              </select>
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.productOrigin?.message}
              </p>
            </div>

            {/* Product Images */}
            <div>
              <label className="block font-semibold mb-1">Product Images</label>
              <ImageUploader
                value={formValues.productImageURLs || []}
                onChange={(urls) => form.setValue("productImageURLs", urls)}
              />
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.productImageURLs?.message}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="border px-4 py-2 rounded text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => form.reset()}
                className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded"
              >
                Save Product
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductForm;
