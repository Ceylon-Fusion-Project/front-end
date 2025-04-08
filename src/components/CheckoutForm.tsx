import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';

interface PaymentIntentResponse {
  clientSecret: string;
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    try {
      // Get payment intent from backend
      const res = await axios.post<PaymentIntentResponse>(
        `${"http://localhost:8080/api/payment/create-payment-intent"}/payment/create-payment-intent`,
        { amount: 1000 }
      );

      // Confirm payment with Stripe
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
      }
    } catch (err) {
      setMessage('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <CardNumberElement
            className="p-2 border rounded w-full"
            options={{ showIcon: true }}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">MM/YY</label>
            <CardExpiryElement className="p-2 border rounded" />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">CVC</label>
            <CardCvcElement className="p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="12345"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>

      {message && (
        <p className={`mt-2 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;