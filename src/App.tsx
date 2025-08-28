import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkoutCategories } from './components/WorkoutCategories';
import { TrainerSection } from './components/TrainerSection';
import { GymGallery } from './components/GymGallery';
import { WorkoutTracker } from './components/WorkoutTracker';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <section id="home">
          <Hero />
        </section>
        
        <section id="categories">
          <WorkoutCategories />
        </section>
        
        <section id="trainers">
          <TrainerSection />
        </section>
        
        <section id="gallery">
          <GymGallery />
        </section>
        
        <WorkoutTracker />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;