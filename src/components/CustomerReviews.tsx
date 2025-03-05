import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { tokens } from "@/styles/tokens";
import { brandColors, theme } from "@/styles/theme";

interface ProductRating {
  productRatingID: number;
  customer: number;
  productRating: number;
  productReview: string;
  createdDate: string;
  updatedDate: string;
}

interface CustomerReviewsProps {
  productRatingList: ProductRating[];
}

export function CustomerReviews({ productRatingList }: CustomerReviewsProps) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const totalReviews = productRatingList.length;
  const averageRating =
    totalReviews > 0
      ? productRatingList.reduce((acc, review) => acc + review.productRating, 0) / totalReviews
      : 0;

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  return (
    <section className={`mt-8 md:mt-12 space-y-6 ${tokens.fonts.body} bg-white p-6 ${theme.borders.thin} ${theme.shadows.medium} ${theme.borderRadius.lg}`}>
      {/* Heading */}
      <h2 className={`${tokens.fontSizes.xl} md:${tokens.fontSizes["2xl"]} font-bold ${tokens.fonts.heading} text-[${brandColors.textPrimary}]`}>
        Customer Reviews
      </h2>

      {/* Average Rating Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
        <div className={`${tokens.fontSizes["3xl"]} md:${tokens.fontSizes["4xl"]} font-bold text-blue-500`}>
          {averageRating.toFixed(1)}
        </div>
        <div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-5 w-5 md:h-6 md:w-6 ${i <= averageRating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {productRatingList.slice(0, visibleReviews).map((review) => (
          <div key={review.productRatingID} className={`pb-4 border-b ${theme.borders.thin}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Customer #{review.customer}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`h-4 w-4 ${i <= review.productRating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-400">{review.createdDate}</span>
            </div>
            <p className="mt-2 text-gray-700">{review.productReview}</p>
          </div>
        ))}
      </div>

      {/* Load More as Clickable Text */}
      {visibleReviews < totalReviews && (
        <div className="flex justify-center mt-4">
          <span
            onClick={loadMoreReviews}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors"
          >
            Load More <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      )}
    </section>
  );
}
