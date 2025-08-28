import React, { useState, useEffect } from 'react';
import { Clock, Trash2, Activity } from 'lucide-react';
import { apiService } from '../services/apiService';
import { Workout } from '../types';

interface WorkoutListProps {
  refreshTrigger: number;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({ refreshTrigger }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getWorkouts();
      setWorkouts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteWorkout(id);
      setWorkouts(prev => prev.filter(w => w.id !== id));
    } catch (error: any) {
      alert(error.error || 'Failed to delete workout');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-6 h-6 text-gray-400 animate-pulse" />
          <h2 className="text-xl font-bold text-gray-700">Loading Workouts...</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-20"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800">Workout History</h2>
        </div>
        <span className="text-sm text-gray-500">
          {workouts.length} workout{workouts.length !== 1 ? 's' : ''}
        </span>
      </div>

      {workouts.length === 0 ? (
        <div className="text-center py-8">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No workouts logged yet</p>
          <p className="text-gray-400 text-sm">Add your first workout to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{workout.workout}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{workout.duration} minutes</span>
                  </div>
                  <span>{formatDate(workout.timestamp)}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(workout.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Delete workout"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};