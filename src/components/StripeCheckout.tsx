import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe publishable key

interface StripeCheckoutProps {
  amount: number;
  currency: string;
}

const StripeCheckout = ({ amount, currency }: StripeCheckoutProps) => {
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create a checkout session on your server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate checkout",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={handleCheckout}
      className="w-full bg-[#635BFF] hover:bg-[#4B45C6]"
    >
      Pay with Stripe
    </Button>
  );
};

export default StripeCheckout;