import React from 'react';
import { Dumbbell, Menu, X, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                ACEest Fitness
              </h1>
              <p className="text-gray-600 text-sm">Transform Your Life</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</a>
            <a href="#workouts" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Workouts</a>
            <a href="#trainers" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Trainers</a>
            <a href="#gallery" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Gallery</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Contact</a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1 text-orange-500" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                <span>Downtown</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</a>
              <a href="#workouts" className="block text-gray-700 hover:text-orange-500 font-medium transition-colors">Workouts</a>
              <a href="#trainers" className="block text-gray-700 hover:text-orange-500 font-medium transition-colors">Trainers</a>
              <a href="#gallery" className="block text-gray-700 hover:text-orange-500 font-medium transition-colors">Gallery</a>
              <a href="#contact" className="block text-gray-700 hover:text-orange-500 font-medium transition-colors">Contact</a>
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-full">
                  Join Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};