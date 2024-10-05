import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import WordPullUp from "../components/magicui/WordPullUp"
import BlurFade from "../components/magicui/BlurFade"

const RestaurantCard = ({ name, image }) => (
  <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
  </div>
)

const trendingRestaurants = [
  { name: "The Baking Xperiment", image: "/images/TBX.jpg" },
  { name: "Mitasu Japanese", image: "/images/mitasu.jpg" },
  { name: "Joe's Western", image: "/images/western.jpg" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Head>
        <title>Web3 Food Rating System - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <WordPullUp
            className="text-6xl font-extrabold text-white mb-8"
            words="Welcome to JustETH!"
          />
          <p className="text-2xl text-white mb-12 animate-pulse">
            Discover and rate restaurants using blockchain technology
          </p>
          <div className="flex justify-center">
            <Link href="/" className="px-8 py-4 bg-white text-purple-600 font-bold text-xl rounded-full hover:bg-purple-100 transition duration-300 transform hover:scale-105 animate-pulse">
              Begin Your Order!
            </Link>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-8 text-center">Trending Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingRestaurants.map((restaurant, idx) => (
            <BlurFade key={restaurant.name} delay={0.25 + idx * 0.1} inView>
              <RestaurantCard name={restaurant.name} image={restaurant.image} />
            </BlurFade>
          ))}
        </div>
      </main>
    </div>
  )
}