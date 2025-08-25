'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Menu, X, Search, User, LogIn, LogOut } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">Golden Hearts</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/opportunities" className="text-gray-700 hover:text-blue-600 transition-colors">
              Find Opportunities
            </Link>
            <Link href="/organizations" className="text-gray-700 hover:text-blue-600 transition-colors">
              Organizations
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-blue-600 transition-colors">
              Community
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search opportunities..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary">
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/opportunities" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
              Find Opportunities
            </Link>
            <Link href="/organizations" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
              Organizations
            </Link>
            <Link href="/community" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
              Community
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
              About
            </Link>
            <div className="pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                    Profile
                  </Link>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                    Sign In
                  </Link>
                  <Link href="/register" className="block px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md mx-3 mt-2">
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
