import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe("pk_test_51QixwiByjVSKbCCDtP8TkY7EilJTDr1pdTDlSLfH4pyTTYiZa0oLYIiYB8K5o9vsTAKdGwD2Po9P60nh54X5IqZm00VxgDYuAx");

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;
