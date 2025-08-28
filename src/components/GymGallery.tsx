import React from 'react';
import { Camera, MapPin, Clock } from 'lucide-react';

const gymImages = [
  {
    url: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'State-of-the-Art Equipment',
    description: 'Latest fitness technology and premium equipment'
  },
  {
    url: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Personal Training Area',
    description: 'Dedicated space for one-on-one training sessions'
  },
  {
    url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Cardio Zone',
    description: 'Extensive cardio equipment with entertainment systems'
  },
  {
    url: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Group Fitness Studio',
    description: 'Spacious studio for yoga, pilates, and group classes'
  },
  {
    url: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Free Weights Section',
    description: 'Complete range of dumbbells and barbells'
  },
  {
    url: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Recovery Lounge',
    description: 'Relaxation area with massage chairs and stretching space'
  }
];

export const GymGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tour Our
            <span className="block bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              Premium Facility
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Step inside ACEest Fitness and discover a world-class facility designed to inspire 
            and motivate you on your fitness journey.
          </p>
          
          {/* Facility Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-500" />
              <span>Downtown Location</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-500" />
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center">
              <Camera className="w-5 h-5 mr-2 text-orange-500" />
              <span>Virtual Tour Available</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gymImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-gray-200 text-sm">{image.description}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience ACEest Fitness?</h3>
            <p className="text-lg mb-6 opacity-90">
              Book a free tour and see why thousands choose us for their fitness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
                Schedule Free Tour
              </button>
              <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-orange-600 transition-colors">
                View Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};