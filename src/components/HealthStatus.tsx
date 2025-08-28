import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { apiService } from '../services/apiService';
import { HealthStatus as HealthStatusType } from '../types';

export const HealthStatus: React.FC = () => {
  const [status, setStatus] = useState<HealthStatusType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      try {
        if (!isMounted) return;
        setLoading(true);
        const response = await apiService.checkHealth();
        if (isMounted) setStatus(response.data || null);
      } catch (error) {
        if (isMounted) {
          setStatus({
            status: 'error',
            timestamp: new Date(),
            uptime: 0
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 10000); // Check every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-300">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-gray-400 animate-pulse" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-700">System Status</h3>
            <p className="text-gray-500">Checking health...</p>
          </div>
        </div>
      </div>
    );
  }

  const isHealthy = status?.status === 'ok';
  const statusColor = isHealthy ? 'green' : 'red';
  const StatusIcon = isHealthy ? CheckCircle : AlertCircle;

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 transition-all duration-300 hover:shadow-lg ${
        isHealthy ? 'border-green-400' : 'border-red-400'
      }`}
    >
      <div className="flex items-center space-x-3">
        <StatusIcon className={`w-6 h-6 ${isHealthy ? 'text-green-500' : 'text-red-500'}`} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isHealthy
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isHealthy ? 'Healthy' : 'Error'}
            </span>
            {status && (
              <>
                <span>Uptime: {status.uptime}s</span>
                <span>Last Check: {status.timestamp.toLocaleTimeString()}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
