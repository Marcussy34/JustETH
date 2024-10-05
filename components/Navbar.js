import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Navbar({ isWalletConnected }) {
  const { theme, toggleTheme } = useTheme();
  const [isOpaque, setIsOpaque] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsOpaque(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isOpaque ? 'bg-pink-700/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'} p-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="flex items-center text-2xl font-bold text-white">
              <img src="/images/image.png" alt="JustETH Logo" className="h-20 w-20" />
              JustETH
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Render "Featured Restaurants" link on all pages except the "/home" page */}
            {router.pathname !== '/home' && (
              <Link href="/" className="text-white hover:text-pink-300 transition duration-300">
                Featured Restaurants
              </Link>
            )}
            <button
               onClick={toggleTheme}
               className={`p-2 rounded-full ${isOpaque ? 'bg-white text-pink-700' : 'bg-pink-700 text-white'} transition duration-300`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <ConnectWallet
               className={`text-white px-4 py-2 rounded-md ${isOpaque ? 'bg-pink-800 hover:bg-pink-900' : 'bg-pink-700 hover:bg-pink-800'} transition duration-300`}
             />
          </div>
        </div>
      </div>
    </nav>
  );
}