import CinnamonOil from "../assets/images/cinnamon-oil.jpg";
import CinnamonStick from "../assets/images/cinnamon-sticks.jpg";
import CinnamonPowder from "../assets/images/cinnamon-powder.jpg";
import CinnamonHoney from "../assets/images/CinnomanHoney01.jpg";
import CinnamonCapsule from "../assets/images/Cinnoman-Capsule.jpg";
import CinnamonTea from "../assets/images/CinnomanTea01.jpeg";
import CinnamonSoap from "../assets/images/CinnomanSoap.jpg";
import CinnamonCandle from "../assets/images/CinnomanCandle02.jpg";
import CinnamonRoll from "../assets/images/CinnomanRoll03.jpg";
import CinnamonCandy from "../assets/images/CinnomanCandy03.jpg";
import CinnamonCookie from "../assets/images/CinnomanCookie03.jpg";
import CinnamonCoffee from "../assets/images/CinnamonCoffee.jpg";

interface Product {
  productID: number;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  productImageURL: string;
  productRatingValue: number;
  categoryType: string;
}

const categories = {
  FOOD_AND_BEVERAGE: "Food & Beverage",
  HEALTH_AND_WELLNESS: "Health & Wellness",
  PERSONAL_CARE: "Personal Care",
  AYURVEDIC: "Ayurvedic",
  HOME_AND_LIFE_STYLE: "Home & Lifestyle",
  INDUSTRIAL: "Industrial",
};

const ProductsData: Product[] = [
  {
    productID: 1,
    productName: "Cinnamon Powder",
    productDescription: "Finely ground cinnamon for all your culinary needs.",
    sellingPrice: 10,
    productImageURL: CinnamonPowder,
    productRatingValue: 4.5,
    categoryType: categories.FOOD_AND_BEVERAGE,
  },
  {
    productID: 2,
    productName: "Cinnamon Sticks",
    productDescription: "Perfect for brewing and cooking.",
    sellingPrice: 15,
    productImageURL: CinnamonStick,
    productRatingValue: 4.7,
    categoryType: categories.FOOD_AND_BEVERAGE,
  },
  {
    productID: 3,
    productName: "Cinnamon Oil",
    productDescription: "Pure cinnamon oil for aromatherapy and cooking.",
    sellingPrice: 20,
    productImageURL: CinnamonOil,
    productRatingValue: 4.8,
    categoryType: categories.HEALTH_AND_WELLNESS,
  },
  {
    productID: 4,
    productName: "Cinnamon Honey",
    productDescription: "A natural blend of honey and cinnamon, great for immune support and digestion.",
    sellingPrice: 18,
    productImageURL: CinnamonHoney,
    productRatingValue: 4.6,
    categoryType: categories.AYURVEDIC,
  },
  {
    productID: 5,
    productName: "Cinnamon Capsules",
    productDescription: "Organic cinnamon extract capsules, great for metabolism and overall wellness.",
    sellingPrice: 22,
    productImageURL: CinnamonCapsule,
    productRatingValue: 4.7,
    categoryType: categories.HEALTH_AND_WELLNESS,
  },
  {
    productID: 6,
    productName: "Cinnamon Tea",
    productDescription: "Aromatic cinnamon-infused tea for a soothing and refreshing experience.",
    sellingPrice: 12,
    productImageURL: CinnamonTea,
    productRatingValue: 4.5,
    categoryType: categories.FOOD_AND_BEVERAGE,
  },
  {
    productID: 7,
    productName: "Cinnamon Soap",
    productDescription: "Handmade cinnamon soap, enriched with natural oils for healthy skin.",
    sellingPrice: 8,
    productImageURL: CinnamonSoap,
    productRatingValue: 4.3,
    categoryType: categories.PERSONAL_CARE,
  },
  {
    productID: 8,
    productName: "Cinnamon Scented Candles",
    productDescription: "Hand-poured cinnamon-scented candles for a warm and cozy ambiance.",
    sellingPrice: 25,
    productImageURL: CinnamonCandle,
    productRatingValue: 4.6,
    categoryType: categories.HOME_AND_LIFE_STYLE,
  },
  {
    productID: 9,
    productName: "Cinnamon Roll",
    productDescription: "Deliciously soft and fluffy cinnamon roll with a sweet glaze topping.",
    sellingPrice: 5,
    productImageURL: CinnamonRoll,
    productRatingValue: 4.8,
    categoryType: categories.FOOD_AND_BEVERAGE,
  },
  {
    productID: 10,
    productName: "Cinnamon Candy",
    productDescription: "Spicy-sweet cinnamon-flavored hard candies, perfect for a quick treat.",
    sellingPrice: 3,
    productImageURL: CinnamonCandy,
    productRatingValue: 4.2,
    categoryType: categories.FOOD_AND_BEVERAGE,
  },
  {
    productID: 11,
    productName: "Cinnamon Cookie",
    productDescription: "Crunchy cinnamon-infused cookies, great with tea or coffee.",
    sellingPrice: 7,
    productImageURL: CinnamonCookie,
    productRatingValue: 4.5,
    categoryType: categories.FOOD_AND_BEVERAGE,
  },
  {
    productID: 12,
    productName: "Cinnamon Coffee",
    productDescription: "A rich and aromatic blend of coffee infused with warm cinnamon spice for a perfect start to your day.",
    sellingPrice: 12,
    productImageURL: CinnamonCoffee,
    productRatingValue: 4.7,
    categoryType: categories.FOOD_AND_BEVERAGE,
  },
];

export default ProductsData;
