import React from 'react';
import { trainers } from '../data/trainers';
import { Star, Phone, Mail, Instagram, Award } from 'lucide-react';

export const TrainerSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our
            <span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Certified Trainers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our world-class trainers are here to guide you every step of the way. 
            Each brings unique expertise and passion to help you achieve your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={trainer.id}
              className="group bg-white/10 backdrop-blur-sm rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/10"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-orange-400/50 group-hover:ring-orange-400 transition-all duration-300">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full px-3 py-1 text-xs font-semibold text-white">
                    {trainer.experience}+ Years
                  </div>
                </div>
              </div>

              {/* Name and Rating */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{trainer.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(trainer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                      }`}
                    />
                  ))}
                  <span className="text-gray-300 text-sm ml-2">{trainer.rating}</span>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {trainer.specialization.slice(0, 2).map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 text-xs px-2 py-1 rounded-full border border-blue-400/30"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <div className="flex items-center justify-center text-gray-300 text-sm mb-2">
                  <Award className="w-4 h-4 mr-1" />
                  Certifications
                </div>
                <div className="text-xs text-gray-400 text-center">
                  {trainer.certifications.slice(0, 2).join(', ')}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <a
                  href={`tel:${trainer.contact.phone}`}
                  className="flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors text-sm group/contact"
                >
                  <Phone className="w-4 h-4 mr-2 group-hover/contact:scale-110 transition-transform" />
                  {trainer.contact.phone}
                </a>
                
                <a
                  href={`mailto:${trainer.contact.email}`}
                  className="flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors text-sm group/contact"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover/contact:scale-110 transition-transform" />
                  Contact
                </a>

                {trainer.contact.instagram && (
                  <a
                    href={`https://instagram.com/${trainer.contact.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-gray-300 hover:text-pink-400 transition-colors text-sm group/contact"
                  >
                    <Instagram className="w-4 h-4 mr-2 group-hover/contact:scale-110 transition-transform" />
                    {trainer.contact.instagram}
                  </a>
                )}
              </div>

              {/* Book Session Button */}
              <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};