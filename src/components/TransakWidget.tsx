import { useEffect } from 'react';
import { TransakConfig, Transak } from '@transak/transak-sdk';
import { useToast } from "@/components/ui/use-toast";

interface TransakWidgetProps {
  onClose: () => void;
}

const TransakWidget = ({ onClose }: TransakWidgetProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const transakConfig: TransakConfig = {
      apiKey: '71ea25cd-22ce-4d91-a7c2-808813fca65d',
      environment: Transak.ENVIRONMENTS.STAGING,
      widgetHeight: "650px",
      widgetWidth: "450px",
      hostURL: window.location.origin,
      widgetStyles: {
        container: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 50,
        }
      }
    };

    const transak = new Transak(transakConfig);

    // Initialize the widget
    transak.init();

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

    // Add event listeners
    transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, handleClose);
    transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, handleOrderCreated);
    transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, handleOrderSuccessful);

    // Cleanup
    return () => {
      transak.cleanup();
    };
  }, [onClose, toast]);

  return null;
};

export default TransakWidget;