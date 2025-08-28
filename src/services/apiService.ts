// src/services/APIService.ts

import { Workout, APIResponse, HealthStatus } from '../types';

class APIService {
  private workouts: Workout[] = [];
  private startTime = Date.now();

  // --- Reset workouts (for tests) ---
  reset() {
    this.workouts = [];
    this.startTime = Date.now();
  }

  // --- Health check endpoint simulation ---
  async checkHealth(): Promise<APIResponse<HealthStatus>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'ok',
          data: {
            status: 'ok',
            timestamp: new Date(),
            uptime: Math.floor((Date.now() - this.startTime) / 1000)
          }
        });
      }, 100); // Simulated latency
    });
  }

  // --- Get all workouts ---
  async getWorkouts(): Promise<APIResponse<Workout[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'ok',
          data: [...this.workouts]
        });
      }, 150);
    });
  }

  // --- Add a new workout ---
  async addWorkout(workoutData: { workout: string; duration: number }): Promise<APIResponse<Workout>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawWorkout = workoutData?.workout;
        const trimmedWorkout = rawWorkout?.trim();

        // Case 1: workout or duration is missing
        if (!rawWorkout || workoutData.duration === undefined) {
          reject({ error: 'workout and duration are required' });
          return;
        }

        // Case 2: workout is empty/whitespace only
        if (!trimmedWorkout) {
          reject({ error: 'duration must be a positive integer' });
          return;
        }

        // Case 3: invalid duration value/type
        if (
          typeof workoutData.duration !== 'number' ||
          Number.isNaN(workoutData.duration) ||
          workoutData.duration <= 0 ||
          !Number.isInteger(workoutData.duration)
        ) {
          reject({ error: 'duration must be a positive integer' });
          return;
        }

        const newWorkout: Workout = {
          id: `workout-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          workout: trimmedWorkout,
          duration: workoutData.duration,
          timestamp: new Date()
        };

        this.workouts.push(newWorkout);

        resolve({
          message: 'added',
          data: newWorkout
        });
      }, 200);
    });
  }

  // --- Delete a workout (bonus feature) ---
  async deleteWorkout(id: string): Promise<APIResponse<void>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.workouts.findIndex((w) => w.id === id);
        if (index === -1) {
          reject({ error: 'Workout not found' });
          return;
        }

        this.workouts.splice(index, 1);
        resolve({ message: 'Workout deleted successfully' });
      }, 100);
    });
  }
}

export const apiService = new APIService();
