# Superset Embedded Dashboards

This project demonstrates how to embed Apache Superset dashboards into a React application using Superset's Embedded SDK and guest tokens for secure access control.

## 🚀 Features

- Seamless integration of Superset dashboards in a React application
- Secure authentication using Superset Guest Tokens
- Clean architecture following MVVM pattern
- TypeScript support for better developer experience
- Environment-based configuration

## 📂 Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── services/         # API and service layer
│   └── superset.ts   # Superset API client and utilities
├── view/             # View components (React components)
├── viewmodel/        # View models and business logic
└── App.tsx           # Main application component
```

## 🛠️ Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Running Superset instance with embedded dashboards enabled

## ⚙️ Configuration

1. **Superset Configuration**
   The project includes a sample Superset configuration file at `extra_superset/superset_config.py` with the necessary settings for enabling embedded dashboards and CORS.

   Key configurations include:
   - EMBEDDED_SUPERSET feature flag
   - CORS settings
   - Security configurations for iframe embedding
   - CSRF protection settings

2. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPERSET_URL=your_superset_instance_url
   VITE_SUPERSET_API_URL=${VITE_SUPERSET_URL}/api/v1
   VITE_SUPERSET_EMBEDDED_URL=${VITE_SUPERSET_URL}/embedded
   ```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🔒 Authentication

This project uses Superset's guest token authentication for embedded dashboards. The flow is as follows:

1. Your backend authenticates with Superset and generates a guest token
2. The frontend uses this token to embed dashboards securely
3. The token has limited permissions as defined by your Superset roles

## 📝 Next Steps

- [ ] Implement backend integration for guest token generation
- [ ] Add error handling and loading states
- [ ] Implement dashboard selection and navigation
- [ ] Add tests for components and services

