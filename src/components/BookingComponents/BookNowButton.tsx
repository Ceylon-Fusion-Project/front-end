import React from "react";
import { theme } from "@/styles/theme";

interface BookNowButtonProps {
  scrollToId?: string;
  text?: string;
  navigateTo?: string;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({
  text = "Book Now",
  
}) => {
  const handleClick = () => {
      const element = document.getElementById("booking-area");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 text-lg font-semibold text-[#bbddd3] transition-all duration-300 rounded-lg shadow-md bg-[#22443a] hover:bg-[#1a332b] hover:scale-105 hover:shadow-lg "
      style={{
            fontFamily: theme.fonts.sans[0],
          }}
    >
      {text}
    </button>
  );
};

export default BookNowButton;
