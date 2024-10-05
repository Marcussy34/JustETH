import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAddress, useSDK } from "@thirdweb-dev/react";
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentPage() {
  const router = useRouter();
  const { itemName, image } = router.query;
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const address = useAddress();
  const sdk = useSDK();

  const price = 17.99;
  const restaurant = "Uncle Roger's Fuiyoh";

  useEffect(() => {
    if (!address) {
      toast.error("Please connect your wallet to make a payment.");
    }
  }, [address]);

  const handlePayment = async () => {
    if (!sdk || !address) {
      toast.error("Please connect your wallet to make a payment.");
      return;
    }

    setIsProcessing(true);
    try {
      const transaction = await sdk.wallet.transfer(
        "0x32F91E4E2c60A9C16cAE736D3b42152B331c147F",
        "0.001"
      );
      console.log("Payment successful", transaction);
      toast.success("Payment successful!");
      setTimeout(() => {
        router.push('/order-confirmation');
      }, 2000);
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Payment failed. Please try again.");
    }
    setIsProcessing(false);
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl font-semibold mb-4">Please connect your wallet to make a payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h1>
        <div className="mb-4">
          <Image src="/images/eggfriedrice.jpg" alt={itemName} width={200} height={200} className="rounded-lg" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{itemName}</h2>
        <p className="text-lg mb-2 text-gray-800">Price: ${price}</p>
        <p className="text-gray-800 mb-4">Restaurant: {restaurant}</p>
        <button 
          onClick={() => setShowConfirmation(true)} 
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Proceed to Payment
        </button>
        <button 
          onClick={() => router.back()} 
          className="w-full mt-2 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Cancel Order
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Payment</h2>
            <p className="text-gray-800 mb-4">Are you sure you want to pay ${price} for {itemName}?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setShowConfirmation(false)} 
                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}