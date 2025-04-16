import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Camera, Brush, Users, Palette, Coffee, Diamond, ShoppingBag, Music, Car, Mic, Gift, Plane } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from '../../components/auth/AuthModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const menuItems = [
  {
    icon: <Camera className="w-5 h-5" />,
    label: 'Photographers',
    href: '/photographers'
  },
  {
    icon: <Brush className="w-5 h-5" />,
    label: 'Makeup Artists',
    href: '/makeup-artists'
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: 'Planners',
    href: '/planners'
  },
  {
    icon: <Palette className="w-5 h-5" />,
    label: 'Decorators',
    href: '/decorators'
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    label: 'Caterers',
    href: '/caterers'
  },
  {
    icon: <Diamond className="w-5 h-5" />,
    label: 'Jewellery',
    href: '/jewellery'
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    label: 'Wedding Wear',
    href: '/wedding-wear'
  },
  {
    icon: <Music className="w-5 h-5" />,
    label: 'Entertainment',
    href: '/entertainment'
  },
  {
    icon: <Gift className="w-5 h-5" />,
    label: 'Gifts',
    href: '/gifts'
  },
  {
    icon: <Plane className="w-5 h-5" />,
    label: 'Honeymoon',
    href: '/honeymoon'
  },
  {
    icon: <Car className="w-5 h-5" />,
    label: 'Car',
    href: '/car'
  },
  {
    icon: <Mic className="w-5 h-5" />,
    label: 'Choreographers',
    href: '/choreographers'
  }
];

const Header = () => {
  const [isVendorsOpen, setIsVendorsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { getItem } = useLocalStorage();
  const user = getItem('token');
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-pink-500">TheLoveLens</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                onMouseEnter={() => setIsVendorsOpen(true)}
                onMouseLeave={() => setIsVendorsOpen(false)}
              >
                <span>Vendors</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isVendorsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-screen max-w-md bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    onMouseEnter={() => setIsVendorsOpen(true)}
                    onMouseLeave={() => setIsVendorsOpen(false)}
                  >
                    <div className="p-4 grid grid-cols-2 gap-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <span className="text-gray-600">{item.icon}</span>
                          <span className="text-gray-700">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/blog" className="text-gray-700 hover:text-gray-900">
              Blog
            </Link>

            <button className="text-gray-700 hover:text-gray-900 flex items-center space-x-1">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-700 font-medium text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-gray-700">{user.name}</span>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Login
                </button>
                <Link
                  to="/vendor/register"
                  className="text-purple-600 hover:text-purple-700"
                >
                  Are you a vendor?
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header; 