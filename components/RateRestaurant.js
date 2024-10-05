// components/RateRestaurant.js
import React from 'react';
import Link from 'next/link';
import StarRating from './StarRating';
import BlurFade from '../components/magicui/BlurFade';

const RateRestaurant = ({ restaurant, index }) => {
  const { name, cuisine, image, averageRating, totalRatings } = restaurant;
  const restaurantSlug = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <BlurFade delay={0.25 + index * 0.1} inView>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
        {image && (
          <img src={image} alt={name} className="w-full h-48 object-cover" />
        )}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
          {cuisine && <p className="text-gray-600 mb-4">{cuisine}</p>}
          
          {/* Render the star rating */}
          <div className="flex items-center mb-4">
            <StarRating rating={averageRating} />
            <span className="ml-2 text-lg font-semibold text-gray-800 bg-white px-2 py-1 rounded-md shadow-sm">
              {averageRating.toFixed(1)}/5 ({totalRatings})
            </span>
          </div>
          
          <div className="flex space-x-4">
            <Link href={`/menu/${restaurantSlug}`}>
              <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                Order
              </button>
            </Link>
            <Link href={`/ratings/${restaurantSlug}`}>
              <button className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                View Ratings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </BlurFade>
  );
};

export default RateRestaurant;
