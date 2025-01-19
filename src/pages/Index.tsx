import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TransakWidget from "@/components/TransakWidget";
import StripeCheckout from "@/components/StripeCheckout";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [showTransak, setShowTransak] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
          Crypto On/Off Ramp
        </h1>
        <p className="text-xl text-blue-100 text-center mb-12">
          Buy and sell cryptocurrency with your local currency instantly
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur border-blue-400/20">
            <h2 className="text-2xl font-bold text-white mb-4">Buy Crypto</h2>
            <p className="text-blue-100 mb-6">
              Purchase cryptocurrency using your preferred payment method
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => setShowTransak(true)}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Buy with Transak
              </Button>
              <StripeCheckout amount={100} currency="USD" />
            </div>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur border-blue-400/20">
            <h2 className="text-2xl font-bold text-white mb-4">Sell Crypto</h2>
            <p className="text-blue-100 mb-6">
              Convert your cryptocurrency back to local currency
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => setShowTransak(true)}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Sell with Transak
              </Button>
              <StripeCheckout amount={100} currency="USD" />
            </div>
          </Card>
        </div>

        <div className="text-center text-blue-200 space-y-4 mb-12">
          <h3 className="text-xl font-semibold">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2">Secure</h4>
              <p>Industry-leading security measures</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Fast</h4>
              <p>Quick and easy transactions</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Global</h4>
              <p>Support for multiple currencies</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="text-left">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white">
                What payment methods are available?
              </AccordionTrigger>
              <AccordionContent className="text-blue-100">
                We offer two main payment methods:
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Transak: Supports credit/debit cards, bank transfers, and various local payment methods</li>
                  <li>Stripe: Secure credit/debit card payments and bank transfers</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-white">
                How do I sell cryptocurrency?
              </AccordionTrigger>
              <AccordionContent className="text-blue-100">
                To sell cryptocurrency, click the "Sell Now" button and follow these steps:
                <ol className="list-decimal list-inside mt-2 space-y-2">
                  <li>Select the cryptocurrency you want to sell</li>
                  <li>Choose your payout method</li>
                  <li>Enter the amount you want to sell</li>
                  <li>Verify your wallet address</li>
                  <li>Confirm the transaction</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-white">
                What payment methods are accepted?
              </AccordionTrigger>
              <AccordionContent className="text-blue-100">
                We accept various payment methods including credit/debit cards, bank transfers, and popular payment services. Available payment methods may vary by region and currency.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-white">
                How long do transactions take?
              </AccordionTrigger>
              <AccordionContent className="text-blue-100">
                Transaction times vary depending on the payment method and network conditions:
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Credit/debit card purchases: Usually instant to 30 minutes</li>
                  <li>Bank transfers: 1-3 business days</li>
                  <li>Crypto selling: 1-24 hours depending on the network</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-white">
                Is my transaction secure?
              </AccordionTrigger>
              <AccordionContent className="text-blue-100">
                Yes, we implement industry-standard security measures including encryption, secure socket layers (SSL), and multi-factor authentication to protect your transactions and personal information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {showTransak && <TransakWidget onClose={() => setShowTransak(false)} />}
      </div>
    </div>
  );
};

export default Index;
