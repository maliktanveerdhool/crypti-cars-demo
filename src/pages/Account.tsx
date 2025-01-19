import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TransakConfig, Transak } from '@transak/transak-sdk';
import Header from "@/components/Header";

const Account = () => {
  const [showWidget, setShowWidget] = useState(false);
  const { toast } = useToast();

  const handleOnRamp = () => {
    const transakConfig: TransakConfig = {
      apiKey: '71ea25cd-22ce-4d91-a7c2-808813fca65d', // Different API key for account page
      environment: Transak.ENVIRONMENTS.STAGING,
      widgetHeight: "650px",
      widgetWidth: "450px",
      defaultCryptoCurrency: 'ETH',
      walletAddress: '',
      themeColor: '000000',
      email: '',
      redirectURL: window.location.origin,
      defaultFiatAmount: 20,
      fiatCurrency: 'EUR',
    };

    const transak = new Transak(transakConfig);
    transak.init();

    // Position the widget
    const widget = document.querySelector('iframe[name="transak-iframe"]') as HTMLIFrameElement;
    if (widget) {
      widget.style.position = 'fixed';
      widget.style.top = '50%';
      widget.style.left = '50%';
      widget.style.transform = 'translate(-50%, -50%)';
      widget.style.zIndex = '50';
    }

    // Event listeners
    Transak.on('*', (data) => {
      console.log('Transak event:', data);
    });

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      toast({
        title: "Widget Closed",
        description: "Transaction cancelled",
      });
      setShowWidget(false);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
      toast({
        title: "Order Created",
        description: "Your transaction is being processed",
      });
      console.log("Order created:", orderData);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      toast({
        title: "Success!",
        description: "Transaction completed successfully",
        variant: "default",
      });
      console.log("Order successful:", orderData);
      transak.close();
      setShowWidget(false);
    });

    setShowWidget(true);
  };

  const handleOffRamp = () => {
    const transakConfig: TransakConfig = {
      apiKey: '71ea25cd-22ce-4d91-a7c2-808813fca65d',
      environment: Transak.ENVIRONMENTS.STAGING,
      widgetHeight: "650px",
      widgetWidth: "450px",
      defaultCryptoCurrency: 'ETH',
      walletAddress: '',
      themeColor: '000000',
      email: '',
      redirectURL: window.location.origin,
      defaultFiatAmount: 20,
      fiatCurrency: 'EUR',
      disableWalletAddressForm: true, // Fixed property name here
      exchangeScreenTitle: 'Sell Crypto From Your Wallet',
      productsAvailed: 'SELL',
      defaultPaymentMethod: 'sepa_bank_transfer',
    };

    const transak = new Transak(transakConfig);
    transak.init();

    // Position the widget
    const widget = document.querySelector('iframe[name="transak-iframe"]') as HTMLIFrameElement;
    if (widget) {
      widget.style.position = 'fixed';
      widget.style.top = '50%';
      widget.style.left = '50%';
      widget.style.transform = 'translate(-50%, -50%)';
      widget.style.zIndex = '50';
    }

    // Event listeners
    Transak.on('*', (data) => {
      console.log('Transak off-ramp event:', data);
    });

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      toast({
        title: "Widget Closed",
        description: "Sell transaction cancelled",
      });
      setShowWidget(false);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
      toast({
        title: "Sell Order Created",
        description: "Your sell transaction is being processed",
      });
      console.log("Sell order created:", orderData);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      toast({
        title: "Success!",
        description: "Sell transaction completed successfully",
        variant: "default",
      });
      console.log("Sell order successful:", orderData);
      transak.close();
      setShowWidget(false);
    });

    setShowWidget(true);
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
                  Convert your cryptocurrency back to fiat currency via SEPA transfer.
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
    </div>
  );
};

export default Account;