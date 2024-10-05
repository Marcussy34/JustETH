import Head from 'next/head'
import RateRestaurant from '../components/RateRestaurant'

const restaurants = [
  { name: "Uncle Roger's Fuiyoh", averageRating: 4.5, totalRatings: 30, cuisine: "Asian Fusion", image: "/images/uncleroger.jpg" },
  { name: "Jamie Oliver's", averageRating: 3.8, totalRatings: 45, cuisine: "British", image: "/images/jamie-oliver.jpg" },
  { name: "Gordon Ramsay's", averageRating: 4.2, totalRatings: 60, cuisine: "Fine Dining", image: "/images/gordon-ramsay.jpg" },
];

export default function RateRestaurants({ isWalletConnected }) {
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-xl">Please connect your wallet to view and rate restaurants.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Head>
        <title>Web3 Food Rating System - Rate Restaurants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-12 text-center animate-bounce">
         Order from these restaurants
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <RateRestaurant key={index} restaurant={restaurant} />
          ))}
        </div>
      </main>
    </div>
  )
}