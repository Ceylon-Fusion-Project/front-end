// // import { useState } from "react";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm, Controller } from "react-hook-form";
// // import * as z from "zod";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Form,
// //   FormControl,
// //   FormDescription,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { ImageUploader } from "@/components/AdminComponents/ImageUploader";
// // import { ProductPreview } from "@/components/AdminComponents/ProductPreview";
// // import { categoryTypes, measuringUnitTypes, origins } from "@/lib/data";

// // interface Product {
// //   productID?: number;
// //   productCode: string;
// //   productName: string;
// //   productDescription: string;
// //   sellingPrice: number;
// //   measuringUnitType: string;
// //   productImageURLs: string[];
// //   createdDate?: string;
// //   updatedDate?: string;
// //   productActiveState?: boolean;
// //   productRatingValue?: number;
// //   categoryType: string;
// //   productOriginID: number;
// // }

// // interface ProductFormProps {
// //   product?: Product | null; // Allow null
// //   onSave: (productData: Product) => void;
// //   onCancel: () => void;
// // }

// // const ProductForm: React.FC<ProductFormProps> = ({product,onSave,onCancel,}) => {
// //   // Define schema for form validation using Zod
// //   const formSchema = z.object({
// //     productCode: z.string().min(2, {
// //       message: "Product code must be at least 2 characters.",
// //     }),
// //     productName: z.string().min(2, {
// //       message: "Product name must be at least 2 characters.",
// //     }),
// //     productDescription: z.string().min(10, {
// //       message: "Description must be at least 10 characters.",
// //     }),
// //     sellingPrice: z.coerce.number().positive({
// //       message: "Price must be a positive number.",
// //     }),
// //     categoryType: z.string().min(1, {
// //       message: "Please select a category.",
// //     }),
// //     measuringUnitType: z.string().min(1, {
// //       message: "Please select a measuring unit.",
// //     }),
// //     productOrigin: z.coerce.number().min(1, {
// //       message: "Please select a product origin.",
// //     }),
// //     productImageURLs: z.array(z.string()).min(1, {
// //       message: "At least one product image is required.",
// //     }),
// //   });

// //   // Type definition for the form values inferred from Zod schema
// //   type FormValues = z.infer<typeof formSchema>;

// //   export default function ProductForm() {
// //     const [showPreview, setShowPreview] = useState<boolean>(false);

// //     // Default form values
// //     const defaultValues: Partial<FormValues> = {
// //       productCode: "",
// //       productName: "",
// //       productDescription: "",
// //       sellingPrice: 0,
// //       productImageURLs: [],
// //     };

// //     // Initialize React Hook Form with TypeScript
// //     const form = useForm<FormValues>({
// //       resolver: zodResolver(formSchema),
// //       defaultValues,
// //     });

// //     // Function to handle form submission
// //     function onSubmit(values: FormValues) {
// //       console.log(values);
// //       alert("Product saved successfully!");
// //     }

// //     const formValues = form.watch();

// //     return (
// //       <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-2xl font-semibold text-amber-800">
// //             Add New Cinnamon Product
// //           </h2>
// //           <Button
// //             variant="outline"
// //             onClick={() => setShowPreview(!showPreview)}
// //             className="border-amber-600 text-amber-700 hover:bg-amber-50"
// //           >
// //             {showPreview ? "Edit Form" : "Preview Product"}
// //           </Button>
// //         </div>

// //         {showPreview ? (
// //           <ProductPreview
// //             product={formValues}
// //             onBack={() => setShowPreview(false)}
// //           />
// //         ) : (
// //           <Form {...form}>
// //             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// //               {/* Product Code and Name */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <FormField
// //                   control={form.control}
// //                   name="productCode"
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>Product Code</FormLabel>
// //                       <FormControl>
// //                         <Input placeholder="CIN-001" {...field} />
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="productName"
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>Product Name</FormLabel>
// //                       <FormControl>
// //                         <Input
// //                           placeholder="Ceylon Cinnamon Sticks"
// //                           {...field}
// //                         />
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />
// //               </div>

// //               {/* Product Description */}
// //               <FormField
// //                 control={form.control}
// //                 name="productDescription"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Product Description</FormLabel>
// //                     <FormControl>
// //                       <Textarea
// //                         placeholder="Premium quality Ceylon cinnamon sticks with a sweet, delicate flavor..."
// //                         className="min-h-[120px]"
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               {/* Pricing and Category Selection */}
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 <FormField
// //                   control={form.control}
// //                   name="sellingPrice"
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>Selling Price</FormLabel>
// //                       <FormControl>
// //                         <Input type="number" step="0.01" min="0" {...field} />
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="categoryType"
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>Category</FormLabel>
// //                       <Controller
// //                         name="categoryType"
// //                         control={form.control}
// //                         render={({ field }) => (
// //                           <Select onValueChange={field.onChange}>
// //                             <FormControl>
// //                               <SelectTrigger>
// //                                 <SelectValue placeholder="Select category" />
// //                               </SelectTrigger>
// //                             </FormControl>
// //                             <SelectContent>
// //                               {categoryTypes.map((category) => (
// //                                 <SelectItem
// //                                   key={category.value}
// //                                   value={category.value}
// //                                 >
// //                                   {category.label}
// //                                 </SelectItem>
// //                               ))}
// //                             </SelectContent>
// //                           </Select>
// //                         )}
// //                       />
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />
// //               </div>

// //               {/* Image Upload */}
// //               <FormField
// //                 control={form.control}
// //                 name="productImageURLs"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Product Images</FormLabel>
// //                     <FormControl>
// //                       <ImageUploader
// //                         value={field.value}
// //                         onChange={field.onChange}
// //                       />
// //                     </FormControl>
// //                     <FormDescription>
// //                       Drag and drop images, browse files, or add image URLs
// //                     </FormDescription>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />

// //               {/* Form Buttons */}
// //               <div className="flex justify-end space-x-4 pt-4">
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   onClick={() => form.reset()}
// //                 >
// //                   Reset
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   className="bg-amber-700 hover:bg-amber-800 text-white"
// //                 >
// //                   Save Product
// //                 </Button>
// //               </div>
// //             </form>
// //           </Form>
// //         )}
// //       </div>
// //     );
// //   }
// // };

// // export default ProductForm;

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ImageUploader } from "@/components/AdminComponents/ImageUploader";
// import { ProductPreview } from "@/components/AdminComponents/ProductPreview";
// import { categoryTypes, measuringUnitTypes, origins } from "@/lib/data";

// // **Define Product Interface**
// interface Product {
//   productID?: number;
//   productCode: string;
//   productName: string;
//   productDescription: string;
//   sellingPrice: number;
//   measuringUnitType: string;
//   productImageURLs: string[];
//   createdDate?: string;
//   updatedDate?: string;
//   productActiveState?: boolean;
//   productRatingValue?: number;
//   categoryType: string;
//   productOriginID: number;
// }

// // **Define Props for ProductForm**
// interface ProductFormProps {
//   product?: Product | null;
//   onSave: (productData: Product) => void;
//   onCancel: () => void;
// }

// // **Zod Validation Schema**
// const formSchema = z.object({
//   productCode: z.string().min(2, {
//     message: "Product code must be at least 2 characters.",
//   }),
//   productName: z.string().min(2, {
//     message: "Product name must be at least 2 characters.",
//   }),
//   productDescription: z.string().min(10, {
//     message: "Description must be at least 10 characters.",
//   }),
//   sellingPrice: z.coerce.number().positive({
//     message: "Price must be a positive number.",
//   }),
//   categoryType: z.string().min(1, {
//     message: "Please select a category.",
//   }),
//   measuringUnitType: z.string().min(1, {
//     message: "Please select a measuring unit.",
//   }),
//   productOriginID: z.coerce.number().min(1, {
//     message: "Please select a product origin.",
//   }),
//   productImageURLs: z.array(z.string()).min(1, {
//     message: "At least one product image is required.",
//   }),
// });

// // **Define Type for Form Values**
// type FormValues = z.infer<typeof formSchema>;

// // **Main ProductForm Component**
// const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
//   const [showPreview, setShowPreview] = useState<boolean>(false);

//   // Default values (check if editing an existing product)
//   const defaultValues: Partial<FormValues> = product
//     ? {
//         ...product,
//         productOriginID: Number(product.productOriginID), // Ensure number conversion
//       }
//     : {
//         productCode: "",
//         productName: "",
//         productDescription: "",
//         sellingPrice: 0,
//         categoryType: "",
//         measuringUnitType: "",
//         productOriginID: 0,
//         productImageURLs: [],
//       };

//   // **Initialize Form Hook**
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues,
//   });

//   // **Handle Form Submission**
//   function onSubmit(values: FormValues) {
//     onSave(values); // Pass the form data to parent component
//   }

//   const formValues = form.watch();

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-amber-800">
//           {product ? "Edit Product" : "Add New Product"}
//         </h2>
//         <Button
//           variant="outline"
//           onClick={() => setShowPreview(!showPreview)}
//           className="border-amber-600 text-amber-700 hover:bg-amber-50"
//         >
//           {showPreview ? "Edit Form" : "Preview Product"}
//         </Button>
//       </div>

//       {showPreview ? (
//         <ProductPreview product={formValues} onBack={() => setShowPreview(false)} />
//       ) : (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* Product Code & Name */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField control={form.control} name="productCode" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Code</FormLabel>
//                   <FormControl><Input placeholder="CIN-001" {...field} /></FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )} />

//               <FormField control={form.control} name="productName" render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Name</FormLabel>
//                   <FormControl><Input placeholder="Cinnamon Sticks" {...field} /></FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )} />
//             </div>

//             {/* Product Description */}
//             <FormField control={form.control} name="productDescription" render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Description</FormLabel>
//                 <FormControl><Textarea placeholder="Premium quality cinnamon sticks..." className="min-h-[120px]" {...field} /></FormControl>
//                 <FormMessage />
//               </FormItem>
//             )} />

//             {/* Selling Price */}
//             <FormField control={form.control} name="sellingPrice" render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Selling Price</FormLabel>
//                 <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
//                 <FormMessage />
//               </FormItem>
//             )} />

//             {/* Category Type */}
//             <FormField control={form.control} name="categoryType" render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {categoryTypes.map((category) => (
//                       <SelectItem key={category.value} value={category.value}>
//                         {category.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )} />

//             {/* Image Upload */}
//             <FormField control={form.control} name="productImageURLs" render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Images</FormLabel>
//                 <FormControl><ImageUploader value={field.value} onChange={field.onChange} /></FormControl>
//                 <FormDescription>Upload images or add URLs</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )} />

//             {/* Form Buttons */}
//             <div className="flex justify-end space-x-4 pt-4">
//               <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
//               <Button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white">Save Product</Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };

// export default ProductForm;

// src/components/ProductForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUploader } from "./ImageUploader";
import { ProductPreview } from "./ProductPreview";
import { categoryTypes, measuringUnitTypes, origins } from "../../lib/data";


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
  productOriginID: z.coerce.number().min(1, {
    message: "Please select a product origin.",
  }),
  productImageURLs: z.array(z.string()).min(1, {
    message: "At least one product image is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Props interface
interface ProductFormProps {
  product: Partial<FormValues> | null;
  onSave: (data: FormValues) => void;
  onCancel: () => void;
}

// Main component
export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [showPreview, setShowPreview] = useState(false);

  const defaultValues: Partial<FormValues> = {
    productCode: product?.productCode || "",
    productName: product?.productName || "",
    productDescription: product?.productDescription || "",
    sellingPrice: product?.sellingPrice || 0,
    categoryType: product?.categoryType || "",
    measuringUnitType: product?.measuringUnitType || "",
    productOriginID: product?.productOriginID || 0,
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
    onSave(values);
  }

  return (
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
        <ProductPreview product={formValues} onBack={() => setShowPreview(false)} />
      ) : (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
            <label className="block font-semibold mb-1">Product Description</label>
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
              {...form.register("productOriginID", { valueAsNumber: true })}
            >
              <option value={0}>Select origin</option>
              {origins.map((origin) => (
                <option key={origin.id} value={origin.id}>
                  {origin.name} ({origin.country})
                </option>
              ))}
            </select>
            <p className="text-red-600 text-sm mt-1">
              {form.formState.errors.productOriginID?.message}
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
  );
}

export default ProductForm;