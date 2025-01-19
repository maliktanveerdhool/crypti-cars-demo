import { useEffect } from 'react';
import { TransakConfig, Transak } from '@transak/transak-sdk';
import { useToast } from "@/components/ui/use-toast";

interface TransakWidgetProps {
  onClose: () => void;
  price?: number;
}

const TransakWidget = ({ onClose, price = 0 }: TransakWidgetProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (price < 19) {
      toast({
        title: "Invalid Amount",
        description: "Minimum purchase amount is 19 EUR",
        variant: "destructive"
      });
      onClose();
      return;
    }

    const transakConfig: TransakConfig = {
      apiKey: '71ea25cd-22ce-4d91-a7c2-808813fca65d',
      environment: Transak.ENVIRONMENTS.STAGING,
      widgetHeight: "650px",
      widgetWidth: "450px",
      defaultCryptoCurrency: 'ETH',
      walletAddress: '', // Optional - customer's wallet address
      themeColor: '000000', // App theme color in hex
      email: '', // Optional - customer's email address
      redirectURL: window.location.origin,
      fiatAmount: price, // Set the selected price
      defaultFiatAmount: price, // Set default amount
      fiatCurrency: 'EUR', // Changed from USD to EUR
    };

    const transak = new Transak(transakConfig);

    // Initialize the widget
    transak.init();

    // Position the widget using direct DOM manipulation after initialization
    const widget = document.querySelector('iframe[name="transak-iframe"]') as HTMLIFrameElement;
    if (widget) {
      widget.style.position = 'fixed';
      widget.style.top = '50%';
      widget.style.left = '50%';
      widget.style.transform = 'translate(-50%, -50%)';
      widget.style.zIndex = '50';
    }

    // Event listeners
    const handleClose = () => {
      toast({
        title: "Widget Closed",
        description: "Transaction cancelled",
      });
      onClose();
    };

    const handleOrderCreated = (orderData: any) => {
      toast({
        title: "Order Created",
        description: "Your transaction is being processed",
      });
      console.log("Order created:", orderData);
    };

    const handleOrderSuccessful = (orderData: any) => {
      toast({
        title: "Success!",
        description: "Transaction completed successfully",
        variant: "default",
      });
      console.log("Order successful:", orderData);
      transak.close();
      onClose();
    };

    // Add event listeners using static Transak.on method
    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, handleClose);
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, handleOrderCreated);
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, handleOrderSuccessful);

    // Cleanup
    return () => {
      transak.cleanup();
    };
  }, [onClose, toast, price]);

  return null;
};

export default TransakWidget;