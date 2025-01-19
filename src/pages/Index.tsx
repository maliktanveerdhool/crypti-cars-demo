import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TransakWidget from "@/components/TransakWidget";
import { useState } from "react";

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);

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
            <Button 
              onClick={() => setShowWidget(true)}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Buy Now
            </Button>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur border-blue-400/20">
            <h2 className="text-2xl font-bold text-white mb-4">Sell Crypto</h2>
            <p className="text-blue-100 mb-6">
              Convert your cryptocurrency back to local currency
            </p>
            <Button 
              onClick={() => setShowWidget(true)}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Sell Now
            </Button>
          </Card>
        </div>

        <div className="text-center text-blue-200 space-y-4">
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

        {showWidget && <TransakWidget onClose={() => setShowWidget(false)} />}
      </div>
    </div>
  );
};

export default Index;