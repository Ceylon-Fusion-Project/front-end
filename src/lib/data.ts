import type { CategoryType, MeasuringUnitType, Origin } from "./types"

export const categoryTypes: CategoryType[] = [
  { value: "CINNAMON_STICKS", label: "Cinnamon Sticks" },
  { value: "CINNAMON_POWDER", label: "Cinnamon Powder" },
  { value: "CINNAMON_OIL", label: "Cinnamon Oil" },
  { value: "CINNAMON_TEA", label: "Cinnamon Tea" },
  { value: "CINNAMON_SUPPLEMENTS", label: "Cinnamon Supplements" },
  { value: "CINNAMON_SPICE_BLENDS", label: "Cinnamon Spice Blends" },
]

export const measuringUnitTypes: MeasuringUnitType[] = [
  { value: "GRAMS", label: "Grams (g)" },
  { value: "KILOGRAMS", label: "Kilograms (kg)" },
  { value: "OUNCES", label: "Ounces (oz)" },
  { value: "POUNDS", label: "Pounds (lb)" },
  { value: "MILLILITERS", label: "Milliliters (ml)" },
  { value: "LITERS", label: "Liters (l)" },
  { value: "PIECES", label: "Pieces (pcs)" },
  { value: "STICKS", label: "Sticks" },
  { value: "PACKETS", label: "Packets" },
]

export const origins: Origin[] = [
  { id: 1, name: "Ceylon", country: "Sri Lanka" },
  { id: 2, name: "Cassia", country: "China" },
  { id: 3, name: "Saigon", country: "Vietnam" },
  { id: 4, name: "Korintje", country: "Indonesia" },
  { id: 5, name: "Malabar", country: "India" },
  { id: 6, name: "Madagascar", country: "Madagascar" },
]

