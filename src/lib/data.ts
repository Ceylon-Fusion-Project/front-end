import type { CategoryType, MeasuringUnitType, Origin } from "./types"

export const categoryTypes: CategoryType[] = [
  { value: "FOOD_AND_BEVERAGE", label: "Food and Beverages" },
  { value: "HEALTH_AND_WELLNESS", label: "Health and wellness" },
  { value: "PERSONAL_CARE", label: "Personal Care" },
  { value: "AYURVEDIC", label: "Ayurvedic" },
  { value: "HOME_AND_LIFE_STYLE", label: "Home and Life Style" },
  { value: "INDUSTRIAL", label: "Industrial" },
]

export const measuringUnitTypes: MeasuringUnitType[] = [
  { value: "GRAM", label: "Grams (g)" },
  { value: "KILO_GRAM", label: "Kilograms (kg)" },
  //{ value: "OUNCES", label: "Ounces (oz)" },
  //{ value: "POUNDS", label: "Pounds (lb)" },
  { value: "MILLI_LITER", label: "Milliliters (ml)" },
  { value: "LITER", label: "Liters (l)" },
  //{ value: "PIECES", label: "Pieces (pcs)" },
  //{ value: "STICKS", label: "Sticks" },
  //{ value: "PACKETS", label: "Packets" },
  { value: "NUMBER", label: "Each"},
]

export const origins: Origin[] = [
  { id: 1, name: "Ceylon", country: "Sri Lanka" },
  { id: 2, name: "Cassia", country: "China" },
  { id: 3, name: "Saigon", country: "Vietnam" },
  { id: 4, name: "Korintje", country: "Indonesia" },
  { id: 5, name: "Malabar", country: "India" },
  { id: 6, name: "Madagascar", country: "Madagascar" },
]


export const roomTypes = [
  { value: "SINGLE", label: "Single Room" },
  { value: "DOUBLE", label: "Double Room" },
  { value: "SUITE", label: "Suite" },
  { value: "DELUXE", label: "Deluxe Room" },
];

export const accommodations = [
  { id: 1, name: "Cinnamon Villa", country: "USA" },
  { id: 2, name: "Cinnamon Garden", country: "UK" },
  { id: 3, name: "Cinnamon Resort", country: "Canada" },
];

export const experienceCenters = [
  { id: 1, name: "Experience Center A" },
  { id: 2, name: "Experience Center B" },
  { id: 3, name: "Experience Center C" },
];

