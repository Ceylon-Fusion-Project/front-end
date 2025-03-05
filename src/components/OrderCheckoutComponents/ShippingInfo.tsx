import React from "react";

interface ShippingInfoProps {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: string;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({
  name,
  address,
  city,
  state,
  zip,
  country,
  shippingMethod,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
      <p className="text-sm"><strong>Name:</strong> {name}</p>
      <p className="text-sm"><strong>Address:</strong> {address}, {city}, {state} {zip}, {country}</p>
      <p className="text-sm"><strong>Shipping Method:</strong> {shippingMethod}</p>
    </div>
  );
};

export default ShippingInfo;
