import { useState, useEffect } from "react";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tokens } from "@/styles/tokens";
import { theme } from "@/styles/theme";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [validImages, setValidImages] = useState<string[]>([]);

  // Validate images on component mount
  useEffect(() => {
    const validateImages = async () => {
      const validatedImages = await Promise.all(
        images.map((url) =>
          new Promise<string | null>((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(url); // Image is valid
            img.onerror = () => resolve(null); // Image is broken
          })
        )
      );
      setValidImages(validatedImages.filter((url): url is string => url !== null));
    };

    validateImages();
  }, [images]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % validImages.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  if (validImages.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className={`space-y-4 ${tokens.spacing[4]}`}>
      {/* Main Image Display */}
      <div className={`relative aspect-square ${theme.shadows.medium}`}>
        <img
          src={validImages[currentImage]}
          alt={`Product Image ${currentImage + 1}`}
          className={`w-full h-full object-cover ${tokens.borderRadius.lg} ${theme.borders.thin}`}
        />

        {/* Zoom Button */}
        <button
          className={`absolute top-2 right-2 bg-${theme.colors.background} p-2 ${tokens.borderRadius.full} ${theme.shadows.small} ${theme.transitions.fast}`}
        >
          <ZoomIn className={`h-6 w-6 text-[${theme.colors.primary}]`} />
        </button>

        {/* Mobile Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-2 md:hidden">
          <Button
            variant="secondary"
            size="icon"
            onClick={previousImage}
            className={`${tokens.borderRadius.full} bg-${theme.colors.background}/80 backdrop-blur-sm ${theme.shadows.small}`}
          >
            <ChevronLeft className={`h-6 w-6 text-[${theme.colors.textPrimary}]`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextImage}
            className={`${tokens.borderRadius.full} bg-${theme.colors.background}/80 backdrop-blur-sm ${theme.shadows.small}`}
          >
            <ChevronRight className={`h-6 w-6 text-[${theme.colors.textPrimary}]`} />
          </Button>
        </div>
      </div>

      {/* Desktop Thumbnails */}
      <div className="hidden md:flex space-x-2 overflow-x-auto">
        {validImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 ${tokens.borders.thin} ${tokens.borderRadius.md} overflow-hidden ${
              currentImage === index
                ? `border-[${theme.colors.primary}]`
                : "border-transparent"
            } ${theme.transitions.fast}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Mobile Indicators (Dots) */}
      <div className="flex justify-center space-x-2 md:hidden">
        {validImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 ${tokens.borderRadius.full} ${theme.transitions.fast} ${
              currentImage === index
                ? `bg-[${theme.colors.primary}]`
                : `bg-[${tokens.colors.border}]`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
