import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Calendar } from 'lucide-react';
import { apiService } from '../services/apiService';
import { Workout } from '../types';

interface StatsProps {
  refreshTrigger: number;
}

export const Stats: React.FC<StatsProps> = ({ refreshTrigger }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await apiService.getWorkouts();
        setWorkouts(response.data || []);
      } catch (error) {
        console.error('Failed to fetch workouts for stats:', error);
      }
    };

    fetchWorkouts();
  }, [refreshTrigger]);

  const totalWorkouts = workouts.length;
  const totalMinutes = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  const averageDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  const stats = [
    {
      label: 'Total Workouts',
      value: totalWorkouts.toString(),
      icon: TrendingUp,
      color: 'blue'
    },
    {
      label: 'Total Minutes',
      value: totalMinutes.toString(),
      icon: Clock,
      color: 'green'
    },
    {
      label: 'Average Duration',
      value: `${averageDuration}min`,
      icon: Calendar,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${stat.color}-400 hover:shadow-lg transition-shadow duration-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
          </div>
        </div>
      ))}
    </div>
  );
};