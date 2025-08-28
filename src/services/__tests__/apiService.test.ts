import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiService } from '../apiService';
import { Workout } from '../../types';

describe('APIService', () => {
  beforeEach(() => {
    apiService.reset(); // use your reset() method
  });

  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await apiService.checkHealth();
      
      expect(response.status).toBe('ok');
      expect(response.data).toBeDefined();
      expect(response.data?.status).toBe('ok');
      expect(response.data?.timestamp).toBeInstanceOf(Date);
      expect(typeof response.data?.uptime).toBe('number');
    });

    it('should return uptime as a number', async () => {
      const response = await apiService.checkHealth();
      
      expect(response.data?.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Get Workouts', () => {
    it('should return empty array initially', async () => {
      const response = await apiService.getWorkouts();
      
      expect(response.status).toBe('ok');
      expect(response.data).toEqual([]);
    });

    it('should return workouts after adding some', async () => {
      // Add a workout first
      await apiService.addWorkout({ workout: 'Running', duration: 30 });
      
      const response = await apiService.getWorkouts();
      
      expect(response.status).toBe('ok');
      expect(response.data).toHaveLength(1);
      expect(response.data?.[0]).toMatchObject({
        workout: 'Running',
        duration: 30
      });
    });
  });

  describe('Add Workout', () => {
    it('should successfully add a valid workout', async () => {
      const workoutData = { workout: 'Yoga', duration: 45 };
      
      const response = await apiService.addWorkout(workoutData);
      
      expect(response.message).toBe('added');
      expect(response.data).toBeDefined();
      expect(response.data?.workout).toBe('Yoga');
      expect(response.data?.duration).toBe(45);
      expect(response.data?.id).toBeDefined();
      expect(response.data?.timestamp).toBeInstanceOf(Date);
    });

    it('should trim workout name', async () => {
      const workoutData = { workout: '  Swimming  ', duration: 60 };
      
      const response = await apiService.addWorkout(workoutData);
      
      expect(response.data?.workout).toBe('Swimming');
    });

    it('should generate unique IDs for workouts', async () => {
      const workout1 = await apiService.addWorkout({ workout: 'Running', duration: 30 });
      const workout2 = await apiService.addWorkout({ workout: 'Cycling', duration: 45 });
      
      expect(workout1.data?.id).not.toBe(workout2.data?.id);
    });

    it('should reject empty workout name', async () => {
      const workoutData = { workout: '', duration: 30 };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'duration must be a positive integer'
      });
      
    });

    it('should reject workout with only whitespace', async () => {
      const workoutData = { workout: '   ', duration: 30 };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'duration must be a positive integer'
      });
      
    });

    it('should reject missing workout name', async () => {
      const workoutData = { workout: undefined as any, duration: 30 };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'workout and duration are required'
      });
    });

    it('should reject missing duration', async () => {
      const workoutData = { workout: 'Running', duration: undefined as any };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'workout and duration are required'
      });
    });

    it('should reject zero duration', async () => {
      const workoutData = { workout: 'Running', duration: 0 };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'duration must be a positive integer'
      });
    });

    it('should reject negative duration', async () => {
      const workoutData = { workout: 'Running', duration: -10 };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'duration must be a positive integer'
      });
    });

    it('should reject non-number duration', async () => {
      const workoutData = { workout: 'Running', duration: 'abc' as any };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'duration must be a positive integer'
      });
    });

    it('should reject decimal duration', async () => {
      const workoutData = { workout: 'Running', duration: 30.5 };
      
      await expect(apiService.addWorkout(workoutData)).rejects.toMatchObject({
        error: 'duration must be a positive integer'
      });
    });
  });

  describe('Delete Workout', () => {
    it('should successfully delete an existing workout', async () => {
      // Add a workout first
      const addResponse = await apiService.addWorkout({ workout: 'Running', duration: 30 });
      const workoutId = addResponse.data?.id!;
      
      const deleteResponse = await apiService.deleteWorkout(workoutId);
      
      expect(deleteResponse.message).toBe('Workout deleted successfully');
      
      // Verify it's actually deleted
      const getResponse = await apiService.getWorkouts();
      expect(getResponse.data).toHaveLength(0);
    });

    it('should reject deleting non-existent workout', async () => {
      const nonExistentId = 'non-existent-id';
      
      await expect(apiService.deleteWorkout(nonExistentId)).rejects.toMatchObject({
        error: 'Workout not found'
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle multiple workouts correctly', async () => {
      // Add multiple workouts
      await apiService.addWorkout({ workout: 'Running', duration: 30 });
      await apiService.addWorkout({ workout: 'Yoga', duration: 45 });
      await apiService.addWorkout({ workout: 'Swimming', duration: 60 });
      
      const response = await apiService.getWorkouts();
      
      expect(response.data).toHaveLength(3);
      expect(response.data?.map(w => w.workout)).toEqual(['Running', 'Yoga', 'Swimming']);
    });

    it('should maintain workout order', async () => {
      const workouts = [
        { workout: 'Morning Run', duration: 30 },
        { workout: 'Afternoon Yoga', duration: 45 },
        { workout: 'Evening Swim', duration: 60 }
      ];
      
      for (const workout of workouts) {
        await apiService.addWorkout(workout);
      }
      
      const response = await apiService.getWorkouts();
      
      expect(response.data?.map(w => w.workout)).toEqual([
        'Morning Run',
        'Afternoon Yoga', 
        'Evening Swim'
      ]);
    });
  });
});