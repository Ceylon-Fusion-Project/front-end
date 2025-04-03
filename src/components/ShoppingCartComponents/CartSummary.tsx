import React from "react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartSummaryProps {
    cart: CartItem[];
}

// const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
//     const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//     const total = subtotal;

//     return (
//         <div className="mt-6 w-1/2 p-4 border-t">
//             <div className="flex justify-between text-lg">
//                 <span>Subtotal:</span>
//                 <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-xl font-semibold mt-2">
//                 <span>Total:</span>
//                 <span>${total.toFixed(2)}</span>
//             </div>
//             <button className="mt-4 w-1/2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
//                 PROCEED TO CHECKOUT
//             </button>
//         </div>
//     );
// };
// const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
//     const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
//     return (
//       <div className="bg-white p-4 rounded-lg shadow border w-full lg:w-80">
//         <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
//         <div className="flex justify-between mb-2 text-gray-700">
//           <span>Subtotal:</span>
//           <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-xl font-bold border-t pt-2">
//           <span>Total:</span>
//           <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white rounded py-2">
//           Proceed to Checkout
//         </button>
//       </div>
//     );
//   };
const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
  
    return (
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        
        <ul className="text-sm text-gray-700 mb-4 space-y-1 max-h-60 overflow-auto pr-2">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} (x{item.quantity}):</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
  
        <div className="flex justify-between mb-1 font-medium">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Tax (5%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold border-t pt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white rounded py-2">
          Proceed to Checkout
        </button>
      </div>
    );
  };  

export default CartSummary;
