import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TransakWidget from "@/components/TransakWidget";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [ethRate, setEthRate] = useState(0);
  const [usdToEurRate, setUsdToEurRate] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch ETH and EUR rates
    const fetchRates = async () => {
      try {
        const [ethResponse, eurResponse] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'),
          fetch('https://api.exchangerate-api.com/v4/latest/USD')
        ]);
        
        const ethData = await ethResponse.json();
        const eurData = await eurResponse.json();
        
        setEthRate(1 / ethData.ethereum.usd);
        setUsdToEurRate(eurData.rates.EUR);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchRates();
  }, []);

  const carListings = [
    {
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800",
      name: "Luxury Sports Car",
      price: 20,
      description: "Sleek and powerful sports car"
    },
    {
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=800",
      name: "Classic Vintage",
      price: 30,
      description: "Timeless classic beauty"
    },
    {
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800",
      name: "Modern SUV",
      price: 40,
      description: "Luxurious family vehicle"
    }
  ];

  const handleBuyClick = (price: number) => {
    if (price < 19) {
      toast({
        title: "Invalid Amount",
        description: "Minimum purchase amount is 19 EUR",
        variant: "destructive"
      });
      return;
    }
    setSelectedPrice(price);
    setShowWidget(true);
  };

  const formatPrice = (priceEUR: number) => {
    const priceETH = priceEUR * ethRate / usdToEurRate;
    return {
      eur: priceEUR.toString(), // Direct EUR price without conversion
      eth: priceETH.toFixed(6)
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="relative mb-16">
          <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden relative">
            <video 
              autoPlay 
              muted 
              loop 
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
              <source src="https://player.vimeo.com/video/456560647/download?quality=sd" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
                  Crypti Cars Marketplace
                </h1>
                <p className="text-xl text-white text-center mb-12">
                  Buy and sell luxury vehicles with cryptocurrency
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {carListings.map((car, index) => {
            const prices = formatPrice(car.price);
            return (
              <Card key={index} className="p-6 bg-white border-2 border-black">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-black mb-2">{car.name}</h3>
                <p className="text-gray-700 mb-2">{car.description}</p>
                <div className="space-y-1 mb-4">
                  <p className="text-2xl font-bold text-black">€{prices.eur}</p>
                  <p className="text-lg text-gray-600">{prices.eth} ETH</p>
                </div>
                <Button 
                  onClick={() => handleBuyClick(car.price)}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  Buy with Crypto
                </Button>
              </Card>
            )
          })}
        </div>

        <div className="text-center text-black space-y-4 mb-12">
          <h3 className="text-xl font-semibold">Why Choose Crypti Cars?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2">Secure Transactions</h4>
              <p>Blockchain-verified ownership transfer</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Global Marketplace</h4>
              <p>Buy and sell cars worldwide</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Crypto-First</h4>
              <p>Native cryptocurrency support</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white border-2 border-black rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="text-left">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-black">
                How do I purchase a car with cryptocurrency?
              </AccordionTrigger>
              <AccordionContent className="text-black">
                To purchase a car with cryptocurrency:
                <ol className="list-decimal list-inside mt-2 space-y-2">
                  <li>Select your desired vehicle</li>
                  <li>Click "Buy with Crypto" button</li>
                  <li>Choose your preferred cryptocurrency</li>
                  <li>Complete KYC verification if required</li>
                  <li>Transfer the funds to complete the purchase</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-black">
                What cryptocurrencies do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-black">
                We accept major cryptocurrencies including:
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Bitcoin (BTC)</li>
                  <li>Ethereum (ETH)</li>
                  <li>USDT</li>
                  <li>USDC</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-black">
                How is the vehicle delivery handled?
              </AccordionTrigger>
              <AccordionContent className="text-black">
                After payment confirmation, you can choose between:
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Professional vehicle transport service (additional fee)</li>
                  <li>Pick up from our secure facilities</li>
                  <li>Local dealership delivery where available</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-black">
                What documentation do I need?
              </AccordionTrigger>
              <AccordionContent className="text-black">
                Required documentation includes:
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Valid government-issued ID</li>
                  <li>Proof of address</li>
                  <li>KYC verification documents</li>
                  <li>Valid driver's license</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-black">
                Is there a warranty on purchased vehicles?
              </AccordionTrigger>
              <AccordionContent className="text-black">
                Yes, all vehicles come with:
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>30-day money-back guarantee</li>
                  <li>1-year limited warranty</li>
                  <li>Optional extended warranty packages</li>
                  <li>24/7 customer support</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <footer className="py-8 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600">
              © 2024 Crypti Cars. Built by MTD Technologies
            </p>
          </div>
        </footer>

        {showWidget && <TransakWidget onClose={() => setShowWidget(false)} price={selectedPrice} />}
      </div>
    </div>
  );
};

export default Index;
