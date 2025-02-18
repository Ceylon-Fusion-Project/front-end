import { useState } from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

interface RadioGroupProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedValue, onChange }) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <RadioGroupItem
          key={option.value}
          value={option.value}
          label={option.label}
          selected={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

interface RadioGroupItemProps {
  value: string;
  label: string;
  selected: boolean;
  onChange: (value: string) => void;
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, label, selected, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name="radio-group"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-blue-600 border-gray-300"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min = 0, max = 100, step = 1, value = 0, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="mt-2 text-sm text-center text-gray-600">{sliderValue}</div>
    </div>
  );
};

const FilteringSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isOnSale, setIsOnSale] = useState(false);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedRating, setSelectedRating] = useState("4");

  return (
    <div className="p-4 space-y-4 bg-white border-2 border-gray-300 rounded-lg shadow-md w-80">

      {/* On Sale */}
      <div>
        <h3 className="font-bold text-black">Discounts</h3>
        <Checkbox label="On Sale" checked={isOnSale} onChange={setIsOnSale} />
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Best Selling Filter */}
      <div>
        <h3 className="font-bold text-black">Best Selling</h3>
        <Checkbox label="Show Best Selling" />
      </div>

      <hr className="border-t-2 border-gray-300"/>
      
      {/* Categories */}
      <div>
        <h3 className="font-bold text-black">Categories</h3>
        <RadioGroup
          options={[
            { value: "all", label: "All Categories" },
            { value: "food", label: "Food & Beverage" },
            { value: "health", label: "Health & Wellness" },
            { value: "personal", label: "Personal Care" },
            { value: "ayurvedic", label: "Ayurvedic" },
            { value: "home", label: "Home & Lifestyle" },
            { value: "industrial", label: "Industrial" },
          ]}
          selectedValue={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-gray-800">Price Range</h3>
        <Slider min={0} max={10000} value={priceRange} onChange={setPriceRange} />
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Ratings */}
      <div>
        <h3 className="font-medium text-gray-800">Ratings</h3>
        <RadioGroup
          options={[
            { value: "5", label: "⭐⭐⭐⭐⭐ & Up" },
            { value: "4", label: "⭐⭐⭐⭐ & Up" },
            { value: "3", label: "⭐⭐⭐ & Up" },
            { value: "2", label: "⭐⭐ & Up" },
            { value: "1", label: "⭐ & Up" },
          ]}
          selectedValue={selectedRating}
          onChange={setSelectedRating}
        />
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Clear Filters */}
      <button
        className="w-full px-4 py-2 text-black border border-gray-300 rounded-full bg-white hover:bg-gradient-to-r hover:from-[#1CD8D2] hover:to-[#93EDC7] hover:text-blue-700 transition-all duration-300 focus-within:border-gray-500"
        onClick={() => {
          setSelectedCategory("all");
          setIsOnSale(false);
          setPriceRange(500);
          setSelectedRating("4");
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilteringSidebar;
