import Link from 'next/link';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ isWalletConnected }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="text-2xl font-bold text-white">JustETH</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isWalletConnected && (
              <Link href="/" className="text-white hover:text-primary transition duration-300">Featured Restaurants</Link>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-primary text-primary-foreground">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {/* Styled ConnectWallet */}
            <ConnectWallet className="text-white px-4 py-2 rounded-md" />
          </div>
        </div>
      </div>
    </nav>
  );
}
