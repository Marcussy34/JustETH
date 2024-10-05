import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

const ReviewCard = ({ name, rating, review }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div>
        <div className="flex items-center mb-2">
          {/* Change the name color */}
          <h3 className="text-lg font-semibold mr-2 text-black">{name}</h3>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                {star <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-600">{review}</p>
      </div>
    </div>
  );
  
  

export default function Reviews() {
  const reviews = [
    { name: "You", rating: 5, review: "I love it!", profilePic: "/api/placeholder/50" },
    { name: "John Doe", rating: 4, review: "Great taste, but a bit pricey.", profilePic: "/api/placeholder/50" },
    { name: "Jane Smith", rating: 5, review: "Best egg fried rice I've ever had!", profilePic: "/api/placeholder/50" },
    { name: "Mike Johnson", rating: 4, review: "Delicious and authentic. Will order again.", profilePic: "/api/placeholder/50" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-40"> {/* Increased top padding */}
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Uncle Roger's Fuiyoh Reviews
          </h1>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}