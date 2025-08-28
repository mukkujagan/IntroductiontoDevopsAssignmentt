import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { HealthStatus } from '../HealthStatus';
import { apiService } from '../../services/apiService';

// Mock the API service
vi.mock('../../services/apiService', () => ({
  apiService: {
    checkHealth: vi.fn()
  }
}));

const mockApiService = vi.mocked(apiService);

describe('HealthStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    mockApiService.checkHealth.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<HealthStatus />);
    
    expect(screen.getByText('System Status')).toBeInTheDocument();
    expect(screen.getByText('Checking health...')).toBeInTheDocument();
  });

  it('should display healthy status when API returns ok', async () => {
    const mockHealthData = {
      status: 'ok' as const,
      timestamp: new Date(),
      uptime: 12345
    };
    
    mockApiService.checkHealth.mockResolvedValueOnce({
      status: 'ok',
      data: mockHealthData
    });

    render(<HealthStatus />);

    await waitFor(() => {
      expect(screen.getByText('Healthy')).toBeInTheDocument();
      expect(screen.getByText('Uptime: 12345s')).toBeInTheDocument();
    });
  });

  it('should display error status when API fails', async () => {
    mockApiService.checkHealth.mockRejectedValueOnce(new Error('API Error'));

    render(<HealthStatus />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  it('should update timestamp display', async () => {
    const mockDate = new Date('2024-01-01T12:00:00Z');
    const mockHealthData = {
      status: 'ok' as const,
      timestamp: mockDate,
      uptime: 100
    };
    
    mockApiService.checkHealth.mockResolvedValueOnce({
      status: 'ok',
      data: mockHealthData
    });

    render(<HealthStatus />);

    await waitFor(() => {
      expect(screen.getByText(/Last Check:/)).toBeInTheDocument();
    });
  });

  it('should handle missing health data gracefully', async () => {
    mockApiService.checkHealth.mockResolvedValueOnce({
      status: 'ok',
      data: undefined
    });

    render(<HealthStatus />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  it('should periodically check health status', async () => {
    vi.useFakeTimers();
    
    const mockHealthData = {
      status: 'ok' as const,
      timestamp: new Date(),
      uptime: 100
    };
    
    mockApiService.checkHealth.mockResolvedValue({
      status: 'ok',
      data: mockHealthData
    });

    render(<HealthStatus />);

    // Initial call
    expect(mockApiService.checkHealth).toHaveBeenCalledTimes(1);

    // Fast forward 10 seconds
    vi.advanceTimersByTime(10000);

    await waitFor(() => {
      expect(mockApiService.checkHealth).toHaveBeenCalledTimes(2);
    });

    vi.useRealTimers();
  });
});