import { Trainer } from '../types';

export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialization: ['Strength Training', 'Powerlifting', 'Nutrition'],
    experience: 8,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@aceestfitness.com',
      instagram: '@sarahfitpro'
    },
    certifications: ['NASM-CPT', 'CSCS', 'Precision Nutrition L1'],
    bio: 'Former competitive powerlifter with 8+ years of experience helping clients achieve their strength goals. Specializes in compound movements and progressive overload.'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    specialization: ['HIIT', 'Cardio', 'Weight Loss'],
    experience: 6,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: {
      phone: '+1 (555) 234-5678',
      email: 'marcus.rodriguez@aceestfitness.com',
      instagram: '@marcushiit'
    },
    certifications: ['ACE-CPT', 'HIIT Specialist', 'TRX Certified'],
    bio: 'High-energy trainer specializing in metabolic conditioning and fat loss. Known for creating challenging yet fun workout experiences.'
  },
  {
    id: '3',
    name: 'Emma Chen',
    specialization: ['Yoga', 'Pilates', 'Flexibility'],
    experience: 10,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: {
      phone: '+1 (555) 345-6789',
      email: 'emma.chen@aceestfitness.com',
      instagram: '@emmayogaflow'
    },
    certifications: ['RYT-500', 'Pilates Instructor', 'Meditation Teacher'],
    bio: 'Certified yoga instructor with a decade of experience in mind-body wellness. Focuses on building strength, flexibility, and inner peace.'
  },
  {
    id: '4',
    name: 'David Thompson',
    specialization: ['Functional Training', 'Athletic Performance', 'Injury Prevention'],
    experience: 12,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: {
      phone: '+1 (555) 456-7890',
      email: 'david.thompson@aceestfitness.com',
      instagram: '@davidfunctional'
    },
    certifications: ['NSCA-CSCS', 'FMS Level 2', 'SFMA Certified'],
    bio: 'Former college athlete turned performance coach. Specializes in movement quality, injury prevention, and sport-specific training.'
  }
];