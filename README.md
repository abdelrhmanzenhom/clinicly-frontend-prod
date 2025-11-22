# Clinicly Frontend

Clinicly is a comprehensive React-based frontend application for managing clinic operations. It provides a user-friendly interface for multiple roles including Admin, Doctor, Patient, and Receptionist, enabling efficient healthcare management.

## Project Overview

This is the frontend component of the Clinicly system, built with modern React and Vite. The application follows a feature-based architecture to organize code by functionality and user roles, ensuring scalability and maintainability.

## Features

- **Multi-Role Support**: Dedicated interfaces for Admin, Doctor, Patient, and Receptionist roles
- **Feature-Based Architecture**: Organized code structure for better maintainability
- **Modern UI**: Built with Material-UI and Tailwind CSS for responsive design
- **State Management**: Centralized state management for complex application logic
- **API Integration**: Axios-based API services for backend communication
- **Authentication**: JWT-based authentication system
- **Payment Integration**: Stripe integration for payment processing
- **Cloud Storage**: Cloudinary integration for media management

## Tech Stack

### Core Technologies

- **React 19.1.1**: Modern React with latest features
- **Vite 7.1.7**: Fast build tool and development server
- **React Router 7.9.5**: Client-side routing

### UI & Styling

- **Material-UI (MUI) 7.3.5**: Component library for consistent UI
- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **Framer Motion 12.23.24**: Animation library for smooth interactions
- **Emotion**: CSS-in-JS styling solution

### State & Data Management

- **TanStack React Query 5.90.7**: Data fetching and caching
- **Axios 1.13.2**: HTTP client for API requests

### Utilities

- **JWT Decode 4.0.0**: JWT token handling
- **Cloudinary 2.8.0**: Cloud-based media management
- **Stripe 19.3.0**: Payment processing
- **clsx 2.1.1**: Conditional CSS classes

### Development Tools

- **ESLint 9.36.0**: Code linting and style enforcement
- **Vite Plugin React 5.0.4**: React integration for Vite

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SharqyCode/clinicly-frontend.git
   cd clinic-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

The application follows a feature-based architecture with the following structure:

```
src/
├── Api/                    # Centralized API services
├── App/                    # Core application files
├── Components/             # Shared UI components
├── Features/               # Feature-specific modules
│   ├── Admin/             # Admin role features
│   ├── Auth/              # Authentication features
│   ├── Doctor/            # Doctor role features
│   ├── Patient/           # Patient role features
│   └── Receptionist/      # Receptionist role features
├── Routes/                 # Global routing configuration
├── store/                  # State management
└── utils/                  # Global utilities
```

Each feature folder contains:

- **Api/**: Feature-specific API services
- **Components/**: UI components
- **Context/**: React Context providers
- **Hooks/**: Custom React hooks
- **Layout/**: Layout components
- **Pages/**: Page components
- **Routes/**: Routing configuration
- **Utils/**: Feature-specific utilities

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## Development

The project uses Vite for fast development with Hot Module Replacement (HMR). ESLint is configured for code quality and consistency.

For more detailed information about the project structure, see [project-structure.md](./project-structure.md).
