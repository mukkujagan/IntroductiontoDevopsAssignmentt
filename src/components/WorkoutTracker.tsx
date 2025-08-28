import React, { useState } from 'react';
import { HealthStatus } from './HealthStatus';
import { WorkoutForm } from './WorkoutForm';
import { WorkoutList } from './WorkoutList';
import { Stats } from './Stats';
import { Activity, TrendingUp } from 'lucide-react';

export const WorkoutTracker: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleWorkoutAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <section id="workouts" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Track Your
            <span className="block bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              Fitness Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor your progress, log your workouts, and stay motivated with our comprehensive tracking system.
          </p>
        </div>

        <div className="space-y-8">
          {/* Health Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mr-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">System Health</h3>
            </div>
            <HealthStatus />
          </div>
          
          {/* Stats Overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Your Progress</h3>
            </div>
            <Stats refreshTrigger={refreshTrigger} />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Workout Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <WorkoutForm onWorkoutAdded={handleWorkoutAdded} />
              </div>
            </div>
            
            {/* Workout List */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <WorkoutList refreshTrigger={refreshTrigger} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};