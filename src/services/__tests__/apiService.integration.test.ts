import { describe, it, expect, beforeEach } from 'vitest';
import { apiService } from '../apiService';

describe('APIService Integration Tests', () => {
  beforeEach(async () => {
    // Clear all workouts before each test
    const workouts = await apiService.getWorkouts();
    if (workouts.data) {
      for (const workout of workouts.data) {
        await apiService.deleteWorkout(workout.id);
      }
    }
  });

  describe('Complete Workout Lifecycle', () => {
    it('should handle complete CRUD operations', async () => {
      // 1. Initially empty
      let response = await apiService.getWorkouts();
      expect(response.data).toHaveLength(0);
      
      // 2. Add workout
      const addResponse = await apiService.addWorkout({ 
        workout: 'Full Body Workout', 
        duration: 90 
      });
      expect(addResponse.message).toBe('added');
      expect(addResponse.data?.workout).toBe('Full Body Workout');
      
      // 3. Verify it exists
      response = await apiService.getWorkouts();
      expect(response.data).toHaveLength(1);
      expect(response.data?.[0].workout).toBe('Full Body Workout');
      
      // 4. Delete workout
      const workoutId = response.data?.[0].id!;
      const deleteResponse = await apiService.deleteWorkout(workoutId);
      expect(deleteResponse.message).toBe('Workout deleted successfully');
      
      // 5. Verify it's gone
      response = await apiService.getWorkouts();
      expect(response.data).toHaveLength(0);
    });

    it('should handle multiple users scenario', async () => {
      // Simulate multiple users adding workouts
      const user1Workouts = [
        { workout: 'User1 Morning Run', duration: 30 },
        { workout: 'User1 Evening Yoga', duration: 45 }
      ];
      
      const user2Workouts = [
        { workout: 'User2 Weight Training', duration: 60 },
        { workout: 'User2 Swimming', duration: 40 }
      ];
      
      // Add all workouts
      for (const workout of [...user1Workouts, ...user2Workouts]) {
        await apiService.addWorkout(workout);
      }
      
      // Verify all are stored
      const response = await apiService.getWorkouts();
      expect(response.data).toHaveLength(4);
      
      // Verify specific workouts exist
      const workoutNames = response.data?.map(w => w.workout) || [];
      expect(workoutNames).toContain('User1 Morning Run');
      expect(workoutNames).toContain('User2 Weight Training');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle mixed valid and invalid requests', async () => {
      // Add valid workout
      await apiService.addWorkout({ workout: 'Valid Workout', duration: 30 });
      
      // Try invalid workout
      await expect(
        apiService.addWorkout({ workout: '', duration: 30 })
      ).rejects.toMatchObject({
        error: 'workout and duration are required'
      });
      
      // Verify valid workout still exists
      const response = await apiService.getWorkouts();
      expect(response.data).toHaveLength(1);
      expect(response.data?.[0].workout).toBe('Valid Workout');
    });
  });

  describe('Performance and Reliability', () => {
    it('should handle rapid successive requests', async () => {
      const promises = [];
      
      // Add 10 workouts simultaneously
      for (let i = 0; i < 10; i++) {
        promises.push(
          apiService.addWorkout({ 
            workout: `Workout ${i}`, 
            duration: 30 + i 
          })
        );
      }
      
      const results = await Promise.all(promises);
      
      // All should succeed
      results.forEach((result, index) => {
        expect(result.message).toBe('added');
        expect(result.data?.workout).toBe(`Workout ${index}`);
      });
      
      // Verify all are stored
      const response = await apiService.getWorkouts();
      expect(response.data).toHaveLength(10);
    });

    it('should maintain data consistency under concurrent operations', async () => {
      // Add initial workout
      const addResponse = await apiService.addWorkout({ 
        workout: 'Test Workout', 
        duration: 30 
      });
      const workoutId = addResponse.data?.id!;
      
      // Perform concurrent read and delete operations
      const [getResponse, deleteResponse] = await Promise.all([
        apiService.getWorkouts(),
        apiService.deleteWorkout(workoutId)
      ]);
      
      // Either the workout exists in get response, or delete succeeded
      expect(
        getResponse.data?.length === 1 || 
        deleteResponse.message === 'Workout deleted successfully'
      ).toBe(true);
    });
  });
});