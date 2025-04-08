import type React from "react";
import { useState, useEffect } from "react";
import { Star, Check } from "lucide-react";
import api from "@/api/axiosInstance";
import NotificationService from "@/utils/NotificationService";
import { getUserID } from "@/services/user-service/userService";

interface Product {
  id: number;
  name: string;
  image: string;
  purchaseDate: string;
}

interface ReviewFormData {
  product: number;
  customer: number;
  productRating: number;
  productReview: string;
}

export default function ReviewPage() {
  // This would typically come from your app state or API
  //const customerId = 3;

  // Mock purchased products - replace with actual API call
  //   const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([
  //     {
  //       id: 101,
  //       name: "Wireless Headphones",
  //       image: "/placeholder.svg?height=80&width=80",
  //       purchaseDate: "2023-04-01",
  //     },
  //     {
  //       id: 102,
  //       name: "Smart Watch",
  //       image: "/placeholder.svg?height=80&width=80",
  //       purchaseDate: "2023-04-05",
  //     },
  //     {
  //       id: 103,
  //       name: "Bluetooth Speaker",
  //       image: "/placeholder.svg?height=80&width=80",
  //       purchaseDate: "2023-04-10",
  //     },
  //   ]);

  //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  //   const [rating, setRating] = useState<number>(0);
  //   const [review, setReview] = useState<string>("");
  //   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  //   const [reviewedProducts, setReviewedProducts] = useState<number[]>([]);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviewedProducts, setReviewedProducts] = useState<number[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  // ✅ Fetch purchased products from merged-cart-details endpoint
  // useEffect(() => {
  //   const fetchMergedCart = async () => {
  //     try {
  //       const res = await api.get("/aggregated-cart/merged-cart-details", {
  //         params: { userId: customerId },
  //       });

  //       const cartItems = res.data.cart;

  //       const products = cartItems.map((item: any) => ({
  //         id: item.productId,
  //         name: item.name,
  //         image: item.image || "/placeholder.svg",
  //         purchaseDate: new Date().toISOString(), // Replace with actual date if available
  //       }));

  //       setPurchasedProducts(products);
  //     } catch (error) {
  //       console.error("Failed to fetch purchased products:", error);
  //     }
  //   };

  //   fetchMergedCart();
  // }, []);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const resUser = await getUserID();
        const fetchedUserId = resUser.data?.userId;
        if (!fetchedUserId) throw new Error("User ID not found");

        setUserId(fetchedUserId);

        const resCart = await api.get("/aggregated-cart/merged-cart-details", {
          params: { userId: fetchedUserId },
        });

        const cartItems = resCart.data.cart;

        const products = cartItems.map((item: any) => ({
          id: item.productId,
          name: item.name,
          image: item.image || "/placeholder.svg",
          purchaseDate: new Date().toISOString(), // Replace with actual date if available
        }));

        setPurchasedProducts(products);
      } catch (err) {
        console.error("Failed to fetch user/cart:", err);
        NotificationService.error("Failed to load user or cart data.");
      }
    };

    fetchUserAndCart();
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setRating(0);
    setReview("");
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!selectedProduct) return;

  //     setIsSubmitting(true);

  //     const formData: ReviewFormData = {
  //       product: selectedProduct.id,
  //       customer: customerId,
  //       productRating: rating,
  //       productReview: review,
  //     };

  //     try {
  //       // Replace with your actual API endpoint
  //       await fetch("https://api.example.com/reviews", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       // Mark product as reviewed
  //       setReviewedProducts([...reviewedProducts, selectedProduct.id]);

  //       // Reset form
  //       setSelectedProduct(null);
  //       setRating(0);
  //       setReview("");

  //       // If all products are reviewed, redirect to home
  //       if (reviewedProducts.length === purchasedProducts.length - 1) {
  //         window.location.href = "/";
  //       }
  //     } catch (error) {
  //       console.error("Error submitting review:", error);
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!selectedProduct) return;

  //   setIsSubmitting(true);

  //   const formData: ReviewFormData = {
  //     product: selectedProduct.id,
  //     customer: customerId,
  //     productRating: rating,
  //     productReview: review,
  //   };

  //   try {
  //     await api.post("/ratings/save-rating", formData);

  //     setReviewedProducts((prev) => [...prev, selectedProduct.id]);
  //     setSelectedProduct(null);
  //     setRating(0);
  //     setReview("");

  //     NotificationService.success("Review submitted successfully!");

  //     if (reviewedProducts.length === purchasedProducts.length - 1) {
  //       window.location.href = "/";
  //     }
  //   } catch (error) {
  //     NotificationService.error("Error submitting review. Please try again.");
  //     console.error("Error submitting review:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || userId === null) return;
  
    setIsSubmitting(true);
  
    const formData: ReviewFormData = {
      product: selectedProduct.id,
      customer: userId,
      productRating: rating,
      productReview: review,
    };
  
    try {
      await api.post("/ratings/save-rating", formData);
  
      setReviewedProducts((prev) => [...prev, selectedProduct.id]);
      setSelectedProduct(null);
      setRating(0);
      setReview("");
  
      NotificationService.success("Review submitted successfully!");
  
      if (reviewedProducts.length === purchasedProducts.length - 1) {
        window.location.href = "/";
      }
    } catch (error) {
      NotificationService.error("Error submitting review. Please try again.");
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    window.location.href = "/";
  };

  const isProductReviewed = (productId: number) => {
    return reviewedProducts.includes(productId);
  };

  //   return (
  //     <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
  //       <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
  //         <div className="text-center mb-6">
  //           <h1 className="text-2xl font-bold text-textPrimary">
  //             Thank You for Your Purchase!
  //           </h1>
  //           <p className="text-textSecondary mt-2">
  //             We appreciate your business and would love to hear your thoughts
  //             on your recent purchases.
  //           </p>
  //         </div>

  //         <div className="mb-6">
  //           <h2 className="text-lg font-medium text-textPrimary mb-3">
  //             Your Recent Purchases
  //           </h2>
  //           <div className="space-y-3">
  //             {purchasedProducts.map((product) => (
  //               <div
  //                 key={product.id}
  //                 onClick={() =>
  //                   !isProductReviewed(product.id) && handleProductSelect(product)
  //                 }
  //                 className={`flex items-center p-3 border rounded-lg ${
  //                   selectedProduct?.id === product.id
  //                     ? "border-primary bg-primary/10"
  //                     : isProductReviewed(product.id)
  //                     ? "border-border bg-border/20 opacity-75"
  //                     : "border-border hover:border-secondary cursor-pointer"
  //                 }`}
  //               >
  //                 <img
  //                   src={product.image || "/placeholder.svg"}
  //                   alt={product.name}
  //                   className="w-16 h-16 object-cover rounded"
  //                 />
  //                 <div className="ml-4 flex-1">
  //                   <h3 className="font-medium text-textPrimary">
  //                     {product.name}
  //                   </h3>
  //                   <p className="text-sm text-textSecondary">
  //                     Purchased on{" "}
  //                     {new Date(product.purchaseDate).toLocaleDateString()}
  //                   </p>
  //                 </div>
  //                 {isProductReviewed(product.id) && (
  //                   <div className="flex items-center text-primary">
  //                     <Check className="w-5 h-5 mr-1" />
  //                     <span className="text-sm">Reviewed</span>
  //                   </div>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {selectedProduct && (
  //           <form onSubmit={handleSubmit} className="space-y-6">
  //             <div className="p-4 bg-background rounded-lg">
  //               <h3 className="font-medium text-textPrimary mb-2">
  //                 Review for: {selectedProduct.name}
  //               </h3>

  //               <div className="space-y-4">
  //                 <div className="space-y-2">
  //                   <label
  //                     htmlFor="rating"
  //                     className="block text-sm font-medium text-textPrimary"
  //                   >
  //                     How would you rate this product?
  //                   </label>
  //                   <div className="flex items-center gap-1">
  //                     {[1, 2, 3, 4, 5].map((star) => (
  //                       <button
  //                         key={star}
  //                         type="button"
  //                         onClick={() => setRating(star)}
  //                         className="focus:outline-none"
  //                       >
  //                         <Star
  //                           className={`w-8 h-8 ${
  //                             rating >= star
  //                               ? "fill-primary text-primary"
  //                               : "text-border"
  //                           }`}
  //                         />
  //                       </button>
  //                     ))}
  //                   </div>
  //                 </div>

  //                 <div className="space-y-2">
  //                   <label
  //                     htmlFor="review"
  //                     className="block text-sm font-medium text-textPrimary"
  //                   >
  //                     Your Review (Optional)
  //                   </label>
  //                   <textarea
  //                     id="review"
  //                     rows={4}
  //                     value={review}
  //                     onChange={(e) => setReview(e.target.value)}
  //                     className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
  //                     placeholder="Share your experience with this product..."
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="flex gap-4">
  //               <button
  //                 type="submit"
  //                 disabled={isSubmitting || rating === 0}
  //                 className="flex-1 bg-primary text-textButton py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  //               >
  //                 {isSubmitting ? "Submitting..." : "Submit Review"}
  //               </button>

  //               <button
  //                 type="button"
  //                 onClick={() => setSelectedProduct(null)}
  //                 className="flex-1 bg-border text-textPrimary py-2 px-4 rounded-md hover:bg-border/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
  //               >
  //                 Cancel
  //               </button>
  //             </div>
  //           </form>
  //         )}

  //         {!selectedProduct && reviewedProducts.length < purchasedProducts.length && (
  //           <div className="text-center text-textSecondary my-4">
  //             <p>Please select a product to review</p>
  //           </div>
  //         )}

  //         {!selectedProduct && (
  //           <div className="mt-6 text-center">
  //             <button
  //               onClick={handleSkip}
  //               className="px-6 py-2 bg-border text-textPrimary rounded-md hover:bg-border/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
  //             >
  //               Skip All Reviews
  //             </button>
  //           </div>
  //         )}
  //       </div>

  //       <p className="mt-6 text-sm text-textSecondary">
  //         We hope to see you again soon!
  //       </p>
  //     </div>
  //   );
  // }
  return (
    // <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
    //   <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
    //     <div className="text-center mb-6">
    //       <h1 className="text-2xl font-bold text-textPrimary">
    //         Thank You for Your Purchase!
    //       </h1>
    //       <p className="text-textSecondary mt-2">
    //         We appreciate your business and would love to hear your thoughts on
    //         your recent purchases.
    //       </p>
    //     </div>

    //     <div className="mb-6">
    //       <h2 className="text-lg font-medium text-textPrimary mb-3">
    //         Your Recent Purchases
    //       </h2>
    //       <div className="space-y-3">
    //         {purchasedProducts.map((product) => (
    //           <div
    //             key={product.id}
    //             onClick={() =>
    //               !isProductReviewed(product.id) && handleProductSelect(product)
    //             }
    //             className={`flex items-center p-3 border rounded-lg ${
    //               selectedProduct?.id === product.id
    //                 ? "border-primary bg-primary/10"
    //                 : isProductReviewed(product.id)
    //                 ? "border-border bg-border/20 opacity-75"
    //                 : "border-border hover:border-secondary cursor-pointer"
    //             }`}
    //           >
    //             <img
    //               src={product.image}
    //               alt={product.name}
    //               className="w-16 h-16 object-cover rounded"
    //             />
    //             <div className="ml-4 flex-1">
    //               <h3 className="font-medium text-textPrimary">
    //                 {product.name}
    //               </h3>
    //               <p className="text-sm text-textSecondary">
    //                 Purchased on{" "}
    //                 {new Date(product.purchaseDate).toLocaleDateString()}
    //               </p>
    //             </div>
    //             {isProductReviewed(product.id) && (
    //               <div className="flex items-center text-primary">
    //                 <Check className="w-5 h-5 mr-1" />
    //                 <span className="text-sm">Reviewed</span>
    //               </div>
    //             )}
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {selectedProduct && (
    //       <form onSubmit={handleSubmit} className="space-y-6">
    //         <div className="p-4 bg-background rounded-lg">
    //           <h3 className="font-medium text-textPrimary mb-2">
    //             Review for: {selectedProduct.name}
    //           </h3>

    //           <div className="space-y-4">
    //             <div className="space-y-2">
    //               <label
    //                 htmlFor="rating"
    //                 className="block text-sm font-medium text-textPrimary"
    //               >
    //                 How would you rate this product?
    //               </label>
    //               <div className="flex items-center gap-1">
    //                 {[1, 2, 3, 4, 5].map((star) => (
    //                   <button
    //                     key={star}
    //                     type="button"
    //                     onClick={() => setRating(star)}
    //                     className="focus:outline-none"
    //                   >
    //                     <Star
    //                       className={`w-8 h-8 ${
    //                         rating >= star
    //                           ? "fill-primary text-primary"
    //                           : "text-border"
    //                       }`}
    //                     />
    //                   </button>
    //                 ))}
    //               </div>
    //             </div>

    //             <div className="space-y-2">
    //               <label
    //                 htmlFor="review"
    //                 className="block text-sm font-medium text-textPrimary"
    //               >
    //                 Your Review (Optional)
    //               </label>
    //               <textarea
    //                 id="review"
    //                 rows={4}
    //                 value={review}
    //                 onChange={(e) => setReview(e.target.value)}
    //                 className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
    //                 placeholder="Share your experience with this product..."
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="flex gap-4">
    //           <button
    //             type="submit"
    //             disabled={isSubmitting || rating === 0}
    //             className="flex-1 bg-primary text-textButton py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    //           >
    //             {isSubmitting ? "Submitting..." : "Submit Review"}
    //           </button>

    //           <button
    //             type="button"
    //             onClick={() => setSelectedProduct(null)}
    //             className="flex-1 bg-border text-textPrimary py-2 px-4 rounded-md hover:bg-border/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </form>
    //     )}

    //     {!selectedProduct &&
    //       reviewedProducts.length < purchasedProducts.length && (
    //         <div className="text-center text-textSecondary my-4">
    //           <p>Please select a product to review</p>
    //         </div>
    //       )}

    //     {!selectedProduct && (
    //       <div className="mt-6 text-center">
    //         <button
    //           onClick={handleSkip}
    //           className="px-6 py-2 bg-border text-textPrimary rounded-md hover:bg-border/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
    //         >
    //           Skip All Reviews
    //         </button>
    //       </div>
    //     )}
    //   </div>

    //   <p className="mt-6 text-sm text-textSecondary">
    //     We hope to see you again soon!
    //   </p>
    // </div>
    // inside your return()
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 transition-all">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-textPrimary">
            Thank You for Your Purchase!
          </h1>
          <p className="text-textSecondary mt-2 text-base">
            We appreciate your business and would love to hear your thoughts on
            your recent purchases.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-3">
            Your Recent Purchases
          </h2>
          <div className="space-y-3">
            {purchasedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  !isProductReviewed(product.id) && handleProductSelect(product)
                }
                className={`flex items-center p-3 rounded-xl border transition-all duration-200 ${
                  selectedProduct?.id === product.id
                    ? "border-primary bg-primary/10"
                    : isProductReviewed(product.id)
                      ? "border-border bg-border/30 opacity-70"
                      : "border-border hover:border-secondary hover:bg-secondary/10 cursor-pointer"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-textPrimary text-sm sm:text-base">
                    {product.name || "Unknown Product"}
                  </h3>
                  <p className="text-sm text-textSecondary">
                    Purchased on{" "}
                    {new Date(product.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
                {isProductReviewed(product.id) && (
                  <div className="flex items-center text-primary text-sm font-medium">
                    <Check className="w-5 h-5 mr-1" />
                    Reviewed
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedProduct && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-background rounded-lg border border-border">
              <h3 className="font-medium text-textPrimary mb-3 text-lg">
                Review for: {selectedProduct.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-textPrimary mb-1"
                  >
                    How would you rate this product?
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 ${
                            rating >= star
                              ? "fill-primary text-primary"
                              : "text-border"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-textPrimary mb-1"
                  >
                    Your Review (Optional)
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary resize-none"
                    placeholder="Share your experience with this product..."
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="flex-1 bg-primary text-textButton py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>

              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="flex-1 bg-border text-textPrimary py-2 px-4 rounded-md hover:bg-border/70 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all"
              >
                Cancel
              </button>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>

              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="flex-1 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!selectedProduct &&
          reviewedProducts.length < purchasedProducts.length && (
            <div className="text-center text-textSecondary my-4 text-sm">
              <p>Please select a product to review</p>
            </div>
          )}

        {!selectedProduct && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSkip}
              className="px-6 py-2 bg-border text-textPrimary rounded-md hover:bg-border/70 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all"
            >
              Skip All Reviews
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-textSecondary">
        We hope to see you again soon!
      </p>
    </div>
  );
}
