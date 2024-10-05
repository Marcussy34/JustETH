import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WordPullUp from "../components/magicui/WordPullUp";
import BlurFade from "../components/magicui/BlurFade";
import { useAddress } from "@thirdweb-dev/react";

const RestaurantCard = ({ name, image, category }) => (
  <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
    <p className="text-sm text-white opacity-75">{category}</p>
  </div>
);

const trendingRestaurants = [
  { name: "The Baking Xperiment", image: "/images/TBX.jpg", category: "Bakery" },
  { name: "Mitasu Japanese", image: "/images/mitasu.jpg", category: "Japanese" },
  { name: "Joe's Western", image: "/images/western.jpg", category: "Western" },
];

const categories = ["All", "Bakery", "Japanese", "Western", "Italian", "Chinese"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const address = useAddress();

  const filteredRestaurants = trendingRestaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || restaurant.category === selectedCategory)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Head>
        <title>JustETH - Blockchain Food Rating</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <WordPullUp
            className="text-6xl font-extrabold text-white mb-8"
            words="JustETH"
            delay={0}
          />
          <WordPullUp
            className="text-2xl text-white mb-12 animate-pulse"
            words="Truly tasty foods on chain"
            delay={0.3}
          />
          <div className="flex justify-center mb-8">
            <BlurFade delay={0.8} duration={0.5} inView>
              <Link href="/">
                <button className="px-8 py-4 bg-white text-purple-600 font-bold text-xl rounded-full hover:bg-purple-100 transition duration-300 transform hover:scale-105 animate-pulse">
                  Begin Your Order!
                </button>
              </Link>
            </BlurFade>
          </div>

          <BlurFade delay={0.5} duration={0.5} inView>
            {address && (
              <p className="text-white mb-4">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
            )}
          </BlurFade>

          <BlurFade delay={0.2} duration={0.5} inView>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full p-2 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.2} duration={0.5} inView>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? "bg-white text-purple-600"
                      : "bg-purple-600 text-white"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </BlurFade>
        </div>

        <WordPullUp
          className="text-3xl font-bold text-white mb-8 text-center"
          words="Trending Restaurants"
          delay={0.3}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant, idx) => (
            <BlurFade key={restaurant.name} delay={0.25 + idx * 0.1} inView>
              <RestaurantCard 
                name={restaurant.name} 
                image={restaurant.image} 
                category={restaurant.category}
              />
            </BlurFade>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}