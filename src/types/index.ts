export interface Workout {
  id: string;
  workout: string;
  duration: number;
  timestamp: Date;
  category: string;
  intensity: 'Low' | 'Medium' | 'High';
}

export interface APIResponse<T> {
  status?: string;
  message?: string;
  data?: T;
  error?: string;
}

export interface HealthStatus {
  status: 'ok' | 'error';
  timestamp: Date;
  uptime: number;
}

export interface WorkoutCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  exercises: string[];
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  image: string;
  contact: {
    phone: string;
    email: string;
    instagram?: string;
  };
  certifications: string[];
  bio: string;
}