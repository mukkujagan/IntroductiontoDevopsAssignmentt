import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkoutForm } from '../WorkoutForm';
import { apiService } from '../../services/apiService';

// Mock the API service
vi.mock('../../services/apiService', () => ({
  apiService: {
    addWorkout: vi.fn()
  }
}));

const mockApiService = vi.mocked(apiService);

describe('WorkoutForm', () => {
  const mockOnWorkoutAdded = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form elements correctly', () => {
    render(<WorkoutForm onWorkoutAdded={mockOnWorkoutAdded} />);
    
    expect(screen.getByText('Log New Workout')).toBeInTheDocument();
    expect(screen.getByLabelText('Workout Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration (minutes)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Workout' })).toBeInTheDocument();
  });

  it('should handle successful workout submission', async () => {
    const user = userEvent.setup();
    mockApiService.addWorkout.mockResolvedValueOnce({
      message: 'added',
      data: { id: '1', workout: 'Running', duration: 30, timestamp: new Date() }
    });

    render(<WorkoutForm onWorkoutAdded={mockOnWorkoutAdded} />);
    
    await user.type(screen.getByLabelText('Workout Type'), 'Running');
    await user.type(screen.getByLabelText('Duration (minutes)'), '30');
    await user.click(screen.getByRole('button', { name: 'Add Workout' }));

    await waitFor(() => {
      expect(mockApiService.addWorkout).toHaveBeenCalledWith({
        workout: 'Running',
        duration: 30
      });
      expect(mockOnWorkoutAdded).toHaveBeenCalled();
    });
  });

  it('should display error message on API failure', async () => {
    const user = userEvent.setup();
    mockApiService.addWorkout.mockRejectedValueOnce({
      error: 'workout and duration are required'
    });

    render(<WorkoutForm onWorkoutAdded={mockOnWorkoutAdded} />);
    
    await user.click(screen.getByRole('button', { name: 'Add Workout' }));

    await waitFor(() => {
      expect(screen.getByText('workout and duration are required')).toBeInTheDocument();
    });
  });

  it('should clear form after successful submission', async () => {
    const user = userEvent.setup();
    mockApiService.addWorkout.mockResolvedValueOnce({
      message: 'added',
      data: { id: '1', workout: 'Yoga', duration: 45, timestamp: new Date() }
    });

    render(<WorkoutForm onWorkoutAdded={mockOnWorkoutAdded} />);
    
    const workoutInput = screen.getByLabelText('Workout Type');
    const durationInput = screen.getByLabelText('Duration (minutes)');
    
    await user.type(workoutInput, 'Yoga');
    await user.type(durationInput, '45');
    await user.click(screen.getByRole('button', { name: 'Add Workout' }));

    await waitFor(() => {
      expect(workoutInput).toHaveValue('');
      expect(durationInput).toHaveValue('');
    });
  });

  it('should disable form during submission', async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => { resolvePromise = resolve; });
    mockApiService.addWorkout.mockReturnValueOnce(promise);

    render(<WorkoutForm onWorkoutAdded={mockOnWorkoutAdded} />);
    
    await user.type(screen.getByLabelText('Workout Type'), 'Swimming');
    await user.type(screen.getByLabelText('Duration (minutes)'), '60');
    
    const submitButton = screen.getByRole('button', { name: 'Add Workout' });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: 'Adding Workout...' })).toBeDisabled();
    expect(screen.getByLabelText('Workout Type')).toBeDisabled();
    expect(screen.getByLabelText('Duration (minutes)')).toBeDisabled();

    // Resolve the promise to complete the test
    resolvePromise!({
      message: 'added',
      data: { id: '1', workout: 'Swimming', duration: 60, timestamp: new Date() }
    });
  });

  it('should trim whitespace from workout input', async () => {
    const user = userEvent.setup();
    mockApiService.addWorkout.mockResolvedValueOnce({
      message: 'added',
      data: { id: '1', workout: 'Pilates', duration: 50, timestamp: new Date() }
    });

    render(<WorkoutForm onWorkoutAdded={mockOnWorkoutAdded} />);
    
    await user.type(screen.getByLabelText('Workout Type'), '  Pilates  ');
    await user.type(screen.getByLabelText('Duration (minutes)'), '50');
    await user.click(screen.getByRole('button', { name: 'Add Workout' }));

    await waitFor(() => {
      expect(mockApiService.addWorkout).toHaveBeenCalledWith({
        workout: 'Pilates',
        duration: 50
      });
    });
  });
});