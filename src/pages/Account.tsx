import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import TransakWidget from "@/components/TransakWidget";
import Header from "@/components/Header";

const Account = () => {
  const [showWidget, setShowWidget] = useState(false);
  const { toast } = useToast();

  const handleOnRamp = () => {
    setShowWidget(true);
  };

  const handleOffRamp = () => {
    toast({
      title: "Coming Soon",
      description: "Off-ramp functionality will be available soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Crypto Transactions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Buy Crypto (On-Ramp)</h3>
                <p className="text-muted-foreground mb-4">
                  Purchase cryptocurrency using your preferred payment method.
                </p>
                <Button onClick={handleOnRamp} className="w-full">
                  Buy Crypto
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Sell Crypto (Off-Ramp)</h3>
                <p className="text-muted-foreground mb-4">
                  Convert your cryptocurrency back to fiat currency.
                </p>
                <Button onClick={handleOffRamp} variant="outline" className="w-full">
                  Sell Crypto
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Transaction History</h3>
              <div className="text-muted-foreground text-center py-8">
                No transactions yet
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Powered by Transak</p>
        </div>
      </footer>

      {showWidget && (
        <TransakWidget
          onClose={() => setShowWidget(false)}
          price={20} // Default minimum amount
        />
      )}
    </div>
  );
};

export default Account;