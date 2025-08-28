# ACEest Fitness & Gym Web Application

A modern, comprehensive fitness tracking web application built with React, TypeScript, and Vite. This application provides a complete gym management system with workout tracking, trainer profiles, and beautiful UI components.

## 🚀 Features

### Core Functionality
- **Health Monitoring**: Real-time system health checks with uptime tracking
- **Workout Management**: Add, view, and delete workout sessions with duration tracking
- **Workout Categories**: 6 comprehensive categories (Strength, Cardio, Flexibility, Functional, Sports, Recovery)
- **Certified Trainers**: Professional trainer profiles with contact information and specializations
- **Gym Gallery**: Beautiful showcase of gym facilities and equipment
- **Progress Tracking**: Visual statistics and workout history

### Technical Features
- **RESTful API Simulation**: Complete CRUD operations for workouts
- **Input Validation**: Comprehensive form validation with error handling
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Glassmorphism effects, gradients, and smooth animations
- **Type Safety**: Full TypeScript implementation
- **Comprehensive Testing**: Unit and integration tests with Vitest

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aceest-fitness-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🧪 Running Tests

This project includes comprehensive test coverage for all core functionality.

### Available Test Commands

```bash
# Run tests in watch mode (recommended for development)
npm run test

# Run tests once and exit
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

### Test Structure

The test suite includes:

#### API Service Tests (`src/services/__tests__/`)
- **Health Check Tests**: Verify system health monitoring
- **Workout CRUD Tests**: Complete Create, Read, Update, Delete operations
- **Validation Tests**: Input validation and error handling
- **Integration Tests**: End-to-end workflow testing

#### Component Tests (`src/components/__tests__/`)
- **WorkoutForm Tests**: Form submission, validation, and user interactions
- **HealthStatus Tests**: Health monitoring display and updates
- **WorkoutList Tests**: Workout display, deletion, and refresh functionality

### Test Coverage Areas

1. **API Functionality**:
   - ✅ Health check endpoint (`GET /health`)
   - ✅ Get workouts endpoint (`GET /workouts`)
   - ✅ Add workout endpoint (`POST /workouts`)
   - ✅ Delete workout endpoint (`DELETE /workouts/:id`)

2. **Input Validation**:
   - ✅ Required field validation
   - ✅ Data type validation (duration must be positive integer)
   - ✅ String trimming and empty string handling
   - ✅ Error message display

3. **User Interface**:
   - ✅ Form rendering and interaction
   - ✅ Loading states and disabled states
   - ✅ Error message display
   - ✅ Success feedback and form clearing

4. **Integration Scenarios**:
   - ✅ Complete workout lifecycle (add → view → delete)
   - ✅ Multiple user scenarios
   - ✅ Concurrent operations
   - ✅ Error recovery

### Running Specific Test Suites

```bash
# Run only API service tests
npm run test -- src/services

# Run only component tests
npm run test -- src/components

# Run specific test file
npm run test -- src/services/__tests__/apiService.test.ts

# Run tests matching a pattern
npm run test -- --grep "Health Check"
```

### Test Configuration

Tests are configured with:
- **Vitest**: Fast unit test runner with Jest-compatible API
- **React Testing Library**: Component testing utilities
- **jsdom**: Browser environment simulation
- **User Event**: Realistic user interaction simulation

## 🏗️ Build and Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── __tests__/       # Component tests
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── WorkoutForm.tsx  # Workout creation form
│   ├── WorkoutList.tsx  # Workout history display
│   ├── HealthStatus.tsx # System health monitoring
│   └── ...
├── services/            # API services
│   ├── __tests__/       # Service tests
│   └── apiService.ts    # Main API service
├── data/               # Static data
│   ├── trainers.ts     # Trainer profiles
│   └── workoutCategories.ts # Workout categories
├── types/              # TypeScript type definitions
├── test/               # Test configuration
└── App.tsx             # Main application component
```

## 🔧 API Endpoints (Simulated)

The application simulates a RESTful API with the following endpoints:

### Health Check
- **GET** `/health` → `{status: "ok", timestamp: Date, uptime: number}`

### Workouts
- **GET** `/workouts` → `Workout[]`
- **POST** `/workouts` → `{message: "added", data: Workout}`
  - Body: `{workout: string, duration: number}`
- **DELETE** `/workouts/:id` → `{message: "Workout deleted successfully"}`

### Validation Rules
- `workout`: Required, non-empty string (trimmed)
- `duration`: Required, positive integer (minutes)

## 🎨 Design Features

- **Modern Glassmorphism**: Frosted glass effects with backdrop blur
- **Gradient Themes**: Orange-to-pink gradients throughout the interface
- **Smooth Animations**: Hover effects, transforms, and micro-interactions
- **Responsive Grid**: Mobile-first responsive design
- **Professional Typography**: Clean hierarchy and readable fonts
- **High-Quality Images**: Professional gym and fitness photography

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test:run`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Images provided by [Pexels](https://pexels.com)
- Icons by [Lucide](https://lucide.dev)
- Built with [Vite](https://vitejs.dev) and [React](https://reactjs.org)