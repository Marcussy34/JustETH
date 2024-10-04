// pages/home.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined })
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    
    window.addEventListener("resize", handleResize)
    handleResize()
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Head>
        <title>Web3 Food Rating System - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {showConfetti && <ReactConfetti width={windowSize.width} height={windowSize.height} />}

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <h1 className="text-6xl font-extrabold text-white mb-8 animate-bounce">
            Welcome to JustETH!
          </h1>
          <p className="text-2xl text-white mb-12 animate-pulse">
            Discover and rate restaurants using blockchain technology
          </p>
          <div className="flex justify-center">
            <Link href="/" className="px-8 py-4 bg-white text-purple-600 font-bold text-xl rounded-full hover:bg-purple-100 transition duration-300 transform hover:scale-105 animate-pulse">
              Rate Your Restaurants!
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Decentralized', 'Transparent', 'Rewarding'].map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">{feature}</h3>
              <p className="text-white">Experience {feature.toLowerCase()} food ratings like never before.</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}