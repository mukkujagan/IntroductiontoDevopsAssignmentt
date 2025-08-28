import React from 'react';
import { workoutCategories } from '../data/workoutCategories';
import { ChevronRight } from 'lucide-react';

export const WorkoutCategories: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Our
            <span className="block bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              Workout Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect workout style for your fitness goals. From strength training to yoga, 
            we have everything you need to transform your body and mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workoutCategories.map((category, index) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl text-2xl mb-6 shadow-lg`}>
                  {category.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Exercise List */}
                <div className="space-y-2 mb-6">
                  {category.exercises.slice(0, 3).map((exercise, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <div className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-3`}></div>
                      {exercise}
                    </div>
                  ))}
                  {category.exercises.length > 3 && (
                    <div className="text-sm text-gray-400 ml-5">
                      +{category.exercises.length - 3} more exercises
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button className={`group/btn w-full bg-gradient-to-r ${category.color} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center`}>
                  Explore Category
                  <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};