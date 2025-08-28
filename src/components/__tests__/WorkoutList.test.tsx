import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkoutList } from '../WorkoutList';
import { apiService } from '../../services/apiService';
import { Workout } from '../../types';

// Mock the API service
vi.mock('../../services/apiService', () => ({
  apiService: {
    getWorkouts: vi.fn(),
    deleteWorkout: vi.fn()
  }
}));

const mockApiService = vi.mocked(apiService);

describe('WorkoutList', () => {
  const mockWorkouts: Workout[] = [
    {
      id: '1',
      workout: 'Running',
      duration: 30,
      timestamp: new Date('2024-01-01T10:00:00Z'),
      category: 'cardio',
      intensity: 'Medium'
    },
    {
      id: '2',
      workout: 'Yoga',
      duration: 45,
      timestamp: new Date('2024-01-01T11:00:00Z'),
      category: 'flexibility',
      intensity: 'Low'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    mockApiService.getWorkouts.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<WorkoutList refreshTrigger={0} />);
    
    expect(screen.getByText('Loading Workouts...')).toBeInTheDocument();
  });

  it('should display workouts when loaded', async () => {
    mockApiService.getWorkouts.mockResolvedValueOnce({
      status: 'ok',
      data: mockWorkouts
    });

    render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText('Running')).toBeInTheDocument();
      expect(screen.getByText('Yoga')).toBeInTheDocument();
      expect(screen.getByText('30 minutes')).toBeInTheDocument();
      expect(screen.getByText('45 minutes')).toBeInTheDocument();
    });
  });

  it('should display empty state when no workouts', async () => {
    mockApiService.getWorkouts.mockResolvedValueOnce({
      status: 'ok',
      data: []
    });

    render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText('No workouts logged yet')).toBeInTheDocument();
      expect(screen.getByText('Add your first workout to get started!')).toBeInTheDocument();
    });
  });

  it('should handle workout deletion', async () => {
    const user = userEvent.setup();
    mockApiService.getWorkouts.mockResolvedValueOnce({
      status: 'ok',
      data: mockWorkouts
    });
    mockApiService.deleteWorkout.mockResolvedValueOnce({
      message: 'Workout deleted successfully'
    });

    render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText('Running')).toBeInTheDocument();
    });

    // Find and click delete button (it should be visible on hover)
    const workoutItem = screen.getByText('Running').closest('.group');
    expect(workoutItem).toBeInTheDocument();
    
    // Hover over the workout item to make delete button visible
    if (workoutItem) {
      await user.hover(workoutItem);
      const deleteButton = screen.getByTitle('Delete workout');
      await user.click(deleteButton);
    }

    await waitFor(() => {
      expect(mockApiService.deleteWorkout).toHaveBeenCalledWith('1');
    });
  });

  it('should refresh when refreshTrigger changes', async () => {
    mockApiService.getWorkouts.mockResolvedValue({
      status: 'ok',
      data: mockWorkouts
    });

    const { rerender } = render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      expect(mockApiService.getWorkouts).toHaveBeenCalledTimes(1);
    });

    // Change refresh trigger
    rerender(<WorkoutList refreshTrigger={1} />);

    await waitFor(() => {
      expect(mockApiService.getWorkouts).toHaveBeenCalledTimes(2);
    });
  });

  it('should display workout count correctly', async () => {
    mockApiService.getWorkouts.mockResolvedValueOnce({
      status: 'ok',
      data: mockWorkouts
    });

    render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText('2 workouts')).toBeInTheDocument();
    });
  });

  it('should handle singular workout count', async () => {
    mockApiService.getWorkouts.mockResolvedValueOnce({
      status: 'ok',
      data: [mockWorkouts[0]]
    });

    render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText('1 workout')).toBeInTheDocument();
    });
  });

  it('should format dates correctly', async () => {
    mockApiService.getWorkouts.mockResolvedValueOnce({
      status: 'ok',
      data: mockWorkouts
    });

    render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      // Check that dates are formatted (exact format may vary by locale)
      expect(screen.getByText(/Jan 1/)).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockApiService.getWorkouts.mockRejectedValueOnce(new Error('API Error'));

    render(<WorkoutList refreshTrigger={0} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch workouts:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});