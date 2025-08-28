import React from 'react';
import { Dumbbell, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  ACEest Fitness
                </h3>
                <p className="text-gray-400 text-sm">Transform Your Life</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for fitness excellence. Join thousands who have transformed their lives with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#workouts" className="text-gray-300 hover:text-orange-400 transition-colors">Workout Categories</a></li>
              <li><a href="#trainers" className="text-gray-300 hover:text-orange-400 transition-colors">Personal Trainers</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-orange-400 transition-colors">Gym Gallery</a></li>
              <li><a href="#membership" className="text-gray-300 hover:text-orange-400 transition-colors">Membership Plans</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Personal Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Group Classes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Nutrition Coaching</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Fitness Assessment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Recovery Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Online Training</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Fitness Street</p>
                  <p className="text-gray-300">Downtown, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-orange-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href="mailto:info@aceestfitness.com" className="text-gray-300 hover:text-orange-400 transition-colors">
                  info@aceestfitness.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon-Fri: 5:00 AM - 11:00 PM</p>
                  <p className="text-gray-300">Sat-Sun: 6:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ACEest Fitness & Gym. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};