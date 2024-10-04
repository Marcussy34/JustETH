import Link from 'next/link'
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar({ isWalletConnected }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="text-2xl font-bold text-white">Web3 Food Ratings</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isWalletConnected && (
              <Link href="/" className="text-white hover:text-purple-200 transition duration-300">Featured Restaurants</Link>
            )}
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  )
}