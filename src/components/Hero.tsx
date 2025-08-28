import React from 'react';
import { Play, Star, Users, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Body & Mind
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join ACEest Fitness and unlock your potential with world-class equipment, 
            certified trainers, and a community that pushes you to be your best.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Your Journey
              <Play className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/20 transition-all duration-300">
              Watch Our Story
              <Play className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-orange-400 mr-2" />
                <span className="text-3xl font-bold text-white">5K+</span>
              </div>
              <p className="text-gray-300 text-sm">Active Members</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-orange-400 mr-2" />
                <span className="text-3xl font-bold text-white">15+</span>
              </div>
              <p className="text-gray-300 text-sm">Expert Trainers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-orange-400 mr-2" />
                <span className="text-3xl font-bold text-white">4.9</span>
              </div>
              <p className="text-gray-300 text-sm">Rating</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-orange-400 mr-2">🏆</span>
                <span className="text-3xl font-bold text-white">50+</span>
              </div>
              <p className="text-gray-300 text-sm">Awards Won</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
    </div>
  );
};