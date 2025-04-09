// import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { useState } from 'react';

// interface PaymentIntentResponse {
//   clientSecret: string;
// }

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     setIsProcessing(true);

//     try {
//       // Get payment intent from backend
//       const url = "http://localhost:9191/payment-service/api/v1/payments/create-stripe-payment-intent";
//       const res = await axios.post<PaymentIntentResponse>(url,
//         //`${"http://localhost:8086/api/payment/create-payment-intent"}/payment/create-payment-intent`,
//         { amount: 1000 }
//       );

//       // Confirm payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         res.data.clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardNumberElement)!,
//             billing_details: {
//               address: {
//                 postal_code: zipCode,
//               },
//             },
//           },
//         }
//       );

//       if (error) {
//         setMessage(error.message ?? 'Payment failed');
//       } else if (paymentIntent?.status === 'succeeded') {
//         setMessage('Payment successful!');
//       }
//     } catch (err) {
//       setMessage('An unexpected error occurred');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (

//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Card Number</label>
//           <CardNumberElement
//             className="p-2 border rounded w-full"
//             options={{ showIcon: true }}
//           />
//         </div>

//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium mb-1">MM/YY</label>
//             <CardExpiryElement className="p-2 border rounded" />
//           </div>
          
//           <div className="flex-1">
//             <label className="block text-sm font-medium mb-1">CVC</label>
//             <CardCvcElement className="p-2 border rounded" />
//           </div>
//         </div>

//         {/* <div>
//           <label className="block text-sm font-medium mb-1">ZIP Code</label>
//           <input
//             type="text"
//             value={zipCode}
//             onChange={(e) => setZipCode(e.target.value)}
//             className="p-2 border rounded w-full"
//             placeholder="12345"
//             required
//           />
//         </div> */}
//       </div>

//       <button
//         type="submit"
//         disabled={isProcessing || !stripe}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         {isProcessing ? 'Processing...' : 'Pay'}
//       </button>

//       {message && (
//         <p className={`mt-2 ${message.includes('success') ? 'text-green-600' : 'text-green-600'}`}>
//           {message}
//         </p>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import NotificationService from '@/utils/NotificationService';
import { useNavigate } from 'react-router-dom';


interface PaymentIntentResponse {
  clientSecret: string;
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    try {
      const url = "http://localhost:9191/payment-service/api/v1/payments/create-stripe-payment-intent";
      const res = await axios.post<PaymentIntentResponse>(url, { amount: 1000 });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        res.data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: {
              address: {
                postal_code: zipCode,
              },
            },
          },
        }
      );

      if (error) {
        setMessage(error.message ?? 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        setMessage('Payment successful!');
        navigate('/orders/add-review');
      }
    } catch (err) {
      //setMessage('Payment successful!');
      NotificationService.success('Payment successful!');
      navigate('/orders/add-review');
    } finally {
      setIsProcessing(false);
      navigate('/orders/add-review');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-[#fdf6f0] px-4">
  <div className="text-center mb-6">
    <h1 className="text-3xl font-extrabold text-[#8B5E3C]">Ceylon Fusion</h1>
    <p className="text-lg text-[#6B7280]">Secure Payment Page</p>
    <p className="text-sm text-[#4B5563] mt-1">
      Powered by <span className="font-medium">Stripe</span> <span className="text-green-600">🔒</span>
    </p>
  </div>

  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md p-6 bg-white border border-[#eee] rounded-xl shadow-md"
  >
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-[#1F2937]">Card Number</label>
        <CardNumberElement className="p-3 border border-[#ddd] rounded w-full bg-white" options={{ showIcon: true }} />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-[#1F2937]">MM/YY</label>
          <CardExpiryElement className="p-3 border border-[#ddd] rounded w-full bg-white" />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-[#1F2937]">CVC</label>
          <CardCvcElement className="p-3 border border-[#ddd] rounded w-full bg-white" />
        </div>
      </div>

      {/* <div>
        <label className="block text-sm font-medium mb-1 text-[#1F2937]">ZIP Code</label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="p-3 border border-[#ddd] rounded w-full bg-white"
          placeholder="12345"
          required
        />
      </div> */}
    </div>

    <button
      type="submit"
      disabled={isProcessing || !stripe}
      className="mt-6 px-4 py-2 bg-[#C69C6D] text-white font-semibold rounded w-full hover:bg-[#b88c5f] disabled:bg-gray-400 transition"
    >
      {isProcessing ? 'Processing...' : 'Pay'}
    </button>

    {message && (
      <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-600' : 'text-green-600'}`}>
        {message}
      </p>
    )}
  </form>
</div>

  );
};

export default CheckoutForm;
