import React, { useState } from "react";
import Card from "./Card";
import CinnamonOil from "../assets/images/cinnamon-oil.jpg";
import CinnamonStick from "../assets/images/cinnamon-sticks.jpg";
import CinnamonPowder from "../assets/images/cinnamon-powder.jpg";
import CinnamonHoney from "../assets/images/CinnomanHoney01.jpg";
import CinnamonCapsule from "../assets/images/Cinnoman-Capsule.jpg";
import CinnomanTea from "../assets/images/CinnomanTea01.jpeg";
import CinnamonSoap from "../assets/images/CinnomanSoap02.jpg";
import CinnamonCandle from "../assets/images/CinnomanCandle02.jpg";
import CinnamonRoll from "../assets/images/CinnomanRoll03.jpg";
import CinnamonCandy from "../assets/images/CinnomanCandy03.jpg";
import CinnamonCockie from "../assets/images/CinnomanCookie03.jpg";
import CinnamonCoffee from "../assets/images/CinnamonCoffee.jpg";

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

const productsData: Product[] = [
  { 
    id: 1, 
    image: CinnamonPowder , 
    title: "Cinnamon Powder", 
    description: "Finely ground cinnamon for all your culinary needs.", 
    price: "$10" },
  { 
    id: 2, 
    image: CinnamonStick , 
    title: "Cinnamon Sticks", 
    description: "Perfect for brewing and cooking.", 
    price: "$15" },
  { 
    id: 3, 
    image: CinnamonOil, 
    title: "Cinnamon Oil", 
    description: "Pure cinnamon oil for aromatherapy and cooking.", 
    price: "$20" },
  { 
    id: 4, 
    image: CinnamonHoney, 
    title: "Cinnamon Honey", 
    description: "A natural blend of honey and cinnamon, great for immune support and digestion.", 
    price: "$18" 
  },
  { 
    id: 5, 
    image: CinnamonCapsule, 
    title: "Cinnamon Capsules", 
    description: "Organic cinnamon extract capsules, great for metabolism and overall wellness.", 
    price: "$22" 
  },
  { 
    id: 6, 
    image: CinnomanTea, 
    title: "Cinnamon Tea", 
    description: "Aromatic cinnamon-infused tea for a soothing and refreshing experience.", 
    price: "$12" 
  },
  { 
    id: 7, 
    image: CinnamonSoap, 
    title: "Cinnamon Soap", 
    description: "Handmade cinnamon soap, enriched with natural oils for healthy skin.", 
    price: "$8" 
  },
  { 
    id: 10, 
    image: CinnamonCandle, 
    title: "Cinnamon Scented Candles", 
    description: "Hand-poured cinnamon-scented candles for a warm and cozy ambiance.", 
    price: "$25" 
  },
  { 
    id: 9, 
    image: CinnamonRoll, 
    title: "Cinnamon Roll", 
    description: "Deliciously soft and fluffy cinnamon roll with a sweet glaze topping.", 
    price: "$5" 
  },
  { 
    id: 10, 
    image: CinnamonCandy, 
    title: "Cinnamon Candy", 
    description: "Spicy-sweet cinnamon-flavored hard candies, perfect for a quick treat.", 
    price: "$3" 
  },
  { 
    id: 11, 
    image: CinnamonCockie, 
    title: "Cinnamon Cookie", 
    description: "Crunchy cinnamon-infused cookies, great with tea or coffee.", 
    price: "$7" 
  },
  { 
    id: 16, 
    image: CinnamonCoffee, 
    title: "Cinnamon Coffee", 
    description: "A rich and aromatic blend of coffee infused with warm cinnamon spice for a perfect start to your day.", 
    price: "$12" 
  }
];

const itemsPerPage = 6;

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  const paginatedProducts = productsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container p-6 mx-auto">
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {paginatedProducts.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 w-[100px] rounded-l disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-white bg-black border rounded-sm">{currentPage}</span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 w-[100px] rounded-r disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
