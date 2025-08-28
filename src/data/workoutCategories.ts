import { WorkoutCategory } from '../types';

export const workoutCategories: WorkoutCategory[] = [
  {
    id: 'strength',
    name: 'Strength Training',
    description: 'Build muscle and increase power with resistance exercises',
    icon: '💪',
    color: 'from-red-500 to-orange-500',
    exercises: ['Deadlifts', 'Squats', 'Bench Press', 'Pull-ups', 'Rows', 'Overhead Press']
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'Improve cardiovascular health and burn calories',
    icon: '🏃‍♂️',
    color: 'from-blue-500 to-cyan-500',
    exercises: ['Running', 'Cycling', 'Swimming', 'Rowing', 'Elliptical', 'HIIT']
  },
  {
    id: 'flexibility',
    name: 'Flexibility & Mobility',
    description: 'Enhance range of motion and prevent injuries',
    icon: '🧘‍♀️',
    color: 'from-green-500 to-emerald-500',
    exercises: ['Yoga', 'Stretching', 'Pilates', 'Foam Rolling', 'Dynamic Warm-up']
  },
  {
    id: 'functional',
    name: 'Functional Training',
    description: 'Real-world movement patterns for daily activities',
    icon: '⚡',
    color: 'from-purple-500 to-pink-500',
    exercises: ['Kettlebell Swings', 'Battle Ropes', 'Box Jumps', 'Burpees', 'Medicine Ball']
  },
  {
    id: 'sports',
    name: 'Sports Specific',
    description: 'Training tailored for specific sports performance',
    icon: '🏀',
    color: 'from-yellow-500 to-orange-500',
    exercises: ['Agility Drills', 'Plyometrics', 'Sport Drills', 'Speed Training']
  },
  {
    id: 'recovery',
    name: 'Recovery & Wellness',
    description: 'Active recovery and wellness practices',
    icon: '🌿',
    color: 'from-teal-500 to-green-500',
    exercises: ['Meditation', 'Sauna', 'Massage', 'Light Walking', 'Breathing Exercises']
  }
];