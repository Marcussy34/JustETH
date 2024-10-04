import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const RateRestaurant = ({ restaurant, onRate }) => {
  const [rating, setRating] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    console.error("app_id is not set in environment variables!");
    return null;
  }
  if (!action) {
    console.error("action is not set in environment variables!");
    return null;
  }

  if (!restaurant || !restaurant.name) {
    console.error("Invalid restaurant data");
    return null;
  }

  const handleRate = () => {
    if (isVerified) {
      onRate(restaurant.name, rating);
    } else {
      alert("Please verify with World ID before submitting a rating.");
    }
  };

  const onSuccess = (result) => {
    setIsVerified(true);
    console.log("Verification successful!", result);
  };

  const handleProof = async (result) => {
    // Here you would typically send the proof to your backend for verification
    console.log("Proof received:", result);
    // For now, we'll just set isVerified to true
    setIsVerified(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      {restaurant.image && (
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h2>
        {restaurant.cuisine && <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              size={24}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <IDKitWidget
          action={action}
          app_id={app_id}
          onSuccess={onSuccess}
          handleVerify={handleProof}
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => (
            <button
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105 mb-2"
              onClick={open}
            >
              Verify with World ID
            </button>
          )}
        </IDKitWidget>
        <button
          className={`w-full font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 ${
            isVerified ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          onClick={handleRate}
          disabled={!isVerified}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RateRestaurant;