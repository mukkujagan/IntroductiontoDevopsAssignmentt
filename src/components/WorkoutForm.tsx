import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { apiService } from '../services/apiService';

interface WorkoutFormProps {
  onWorkoutAdded: () => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onWorkoutAdded }) => {
  const [workout, setWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const durationNum = parseInt(duration, 10);
      await apiService.addWorkout({
        workout: workout.trim(),
        duration: durationNum
      });
      
      setWorkout('');
      setDuration('');
      onWorkoutAdded();
    } catch (err: any) {
      setError(err.error || 'Failed to add workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Plus className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Log New Workout</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="workout" className="block text-sm font-medium text-gray-700 mb-2">
            Workout Type
          </label>
          <input
            type="text"
            id="workout"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="e.g., Running, Yoga, Weight Training"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="30"
            min="1"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
        >
          {loading ? 'Adding Workout...' : 'Add Workout'}
        </button>
      </form>
    </div>
  );
};