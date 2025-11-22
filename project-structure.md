# Clinicly Frontend App - File/Folder Structure

This document describes the file and folder structure of the Clinicly frontend application, a React-based web app built with Vite. The app follows a feature-based architecture for better organization and scalability, supporting multiple user roles: Admin, Doctor, Patient, and Receptionist.

## Overall Structure

```
clinic-frontend/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── project-structure.md
├── README.md
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── Api/
    │   ├── Helpers/
    │   └── Services/
    │       └── userService.js
    ├── App/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── assets/
    │   └── react.svg
    ├── Components/
    │   ├── Button/
    │   ├── FormContorls/
    │   └── Modal/
    ├── Features/
    │   ├── Admin/
    │   │   ├── Api/
    │   │   │   ├── Helpers/
    │   │   │   └── Services/
    │   │   ├── Components/
    │   │   ├── Context/
    │   │   ├── Hooks/
    │   │   ├── Layout/
    │   │   │   └── Layout.jsx
    │   │   ├── Pages/
    │   │   │   └── displayUsers.jsx
    │   │   ├── Routes/
    │   │   └── Utils/
    │   ├── Auth/
    │   │   ├── Api/
    │   │   │   ├── Helpers/
    │   │   │   └── Services/
    │   │   ├── Components/
    │   │   ├── Context/
    │   │   ├── Hooks/
    │   │   ├── Layout/
    │   │   │   └── Layout.jsx
    │   │   ├── Pages/
    │   │   │   └── Login.jsx
    │   │   ├── Routes/
    │   │   └── Utils/
    │   ├── Doctor/
    │   │   ├── Api/
    │   │   │   ├── Helpers/
    │   │   │   └── Services/
    │   │   ├── Components/
    │   │   ├── Context/
    │   │   ├── Hooks/
    │   │   ├── Layout/
    │   │   │   └── Layout.jsx
    │   │   ├── Pages/
    │   │   │   └── Login.jsx
    │   │   ├── Routes/
    │   │   └── Utils/
    │   ├── Patient/
    │   │   ├── Api/
    │   │   │   ├── Helpers/
    │   │   │   └── Services/
    │   │   ├── Components/
    │   │   ├── Context/
    │   │   ├── Hooks/
    │   │   ├── Layout/
    │   │   │   └── Layout.jsx
    │   │   ├── Pages/
    │   │   │   └── Login.jsx
    │   │   ├── Routes/
    │   │   └── Utils/
    │   └── Receptionist/
    │       ├── Api/
    │       │   ├── Helpers/
    │       │   └── Services/
    │       ├── Components/
    │       ├── Context/
    │       ├── Hooks/
    │       ├── Layout/
    │       │   └── Layout.jsx
    │       ├── Pages/
    │       │   └── Login.jsx
    │       ├── Routes/
    │       └── Utils/
    ├── Pew/
    │   └── pew
    ├── Routes/
    ├── store/
    └── utils/
        ├── dateUtils.js
        └── validationSchema.js
```

## Folder Descriptions

### Root Level

- **.gitignore**: Specifies files and directories to be ignored by Git version control.
- **eslint.config.js**: Configuration file for ESLint, used for code linting and style enforcement.
- **index.html**: The main HTML entry point for the Vite application.
- **package-lock.json**: Locks the versions of installed npm packages for consistent builds.
- **package.json**: Defines the project dependencies, scripts, and metadata.
- **project-structure.md**: This documentation file describing the project structure.
- **README.md**: Project documentation, typically containing setup instructions and project overview.
- **vite.config.js**: Configuration file for Vite, the build tool and development server.

### public/

- Contains static assets that are served directly by the web server.
- **vite.svg**: Vite logo SVG file.

### src/

- The main source code directory containing all application logic.

#### src/Api/

- Centralized API-related code.
- **Helpers/**: Utility functions for API operations.
- **Services/**: API service modules.
  - **userService.js**: Handles user-related API calls.

#### src/App/

- Core application files.
- **App.css**: Styles for the main App component.
- **App.jsx**: Main App component, likely the root of the React application.
- **index.css**: Global CSS styles.
- **main.jsx**: Entry point for the React application, where the app is rendered.

#### src/assets/

- Static assets like images and icons.
- **react.svg**: React logo SVG file.

#### src/Components/

- Shared, reusable UI components across the application.
- **Button/**: Button component variants.
- **FormContorls/**: Form input controls and related components.
- **Modal/**: Modal dialog components.

#### src/Features/

- Feature-based organization, separating concerns by functionality and user roles.

##### src/Features/Admin/

- Admin-specific features and components.
- **Api/**: Admin-related API code (Helpers, Services).
- **Components/**: Reusable UI components for admin features.
- **Context/**: React Context providers for state management in admin features.
- **Hooks/**: Custom React hooks for admin functionality.
- **Layout/**: Layout components for admin pages.
  - **Layout.jsx**: Main layout wrapper for admin sections.
- **Pages/**: Page components for admin routes.
  - **displayUsers.jsx**: Page for displaying user information.
- **Routes/**: Routing configuration for admin features.
- **Utils/**: Utility functions specific to admin features.

##### src/Features/Auth/

- Authentication-related features.
- Similar structure to other features, with Api, Components, Context, Hooks, Layout, Pages, Routes, and Utils.
- **Pages/Login.jsx**: Login page component.

##### src/Features/Doctor/

- Doctor-specific features and components.
- Similar structure to Admin, with Api, Components, Context, Hooks, Layout, Pages, Routes, and Utils.
- **Pages/Login.jsx**: Doctor login page component.

##### src/Features/Patient/

- Patient-specific features and components.
- Similar structure to Admin, with Api, Components, Context, Hooks, Layout, Pages, Routes, and Utils.
- **Pages/Login.jsx**: Patient login page component.

##### src/Features/Receptionist/

- Receptionist-specific features and components.
- Similar structure to Admin, with Api, Components, Context, Hooks, Layout, Pages, Routes, and Utils.
- **Pages/Login.jsx**: Receptionist login page component.

#### src/Pew/

- Unclear purpose, possibly a placeholder or specific feature.
- **pew**: A file with unknown content (possibly a script or data file).

#### src/Routes/

- Global routing configuration for the application.

#### src/store/

- Centralized state management, likely using a library like Redux or Zustand.

#### src/utils/

- Global utility functions and helpers.
- **dateUtils.js**: Date manipulation and formatting utilities.
- **validationSchema.js**: Validation schemas, possibly using libraries like Yup or Joi.

## Architecture Notes

- The app uses a **feature-based architecture**, organizing code by features (Admin, Auth, Doctor, Patient, Receptionist) rather than by type (components, services).
- Each feature has its own Api, Components, Context, Hooks, Layout, Pages, Routes, and Utils folders for complete encapsulation.
- API code is centralized in src/Api/ for shared services, with feature-specific API code in each feature's Api folder.
- Shared components are in src/Components/ for reusability across features.
- Global utilities are in src/utils/, and state management in src/store/.
- The structure supports multiple user roles with dedicated feature folders, promoting scalability and maintainability.
- Built with Vite for fast development and optimized production builds.
- Uses React for the UI framework, with JSX for component definitions.
