# UserConnect - Modern User Directory Frontend

A modern, responsive web application for user authentication and directory search built with React, TypeScript, and Tailwind CSS.

## Features

- **Authentication System**
  - User registration with form validation
  - Secure login with JWT token management
  - Persistent authentication state
  - Automatic token refresh handling

- **Advanced User Search**
  - Search by name or email
  - Filter by location (city, country)
  - Age range filtering
  - Gender filtering
  - Sort by multiple criteria
  - Pagination support

- **Modern UI/UX**
  - Responsive design for all devices
  - Clean, professional interface
  - Loading states and error handling
  - Accessible form components

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd authentication-fe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your API base URL:
```
VITE_API_BASE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

This frontend integrates with the following API endpoints:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### User Search
- `GET /users/search` - Advanced user search with filters

### Required API Response Format

**Authentication Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    // ... other user fields
  }
}
```

**Search Response:**
```json
{
  "users": [/* array of user objects */],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   ├── search/         # User search components
│   └── ui/            # Reusable UI components
├── context/           # React context providers
├── services/          # API service functions
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Features Overview

### Authentication
- Secure user registration and login
- Client-side form validation
- JWT token management
- Persistent login state

### User Directory
- Advanced search with multiple filters
- Real-time search results
- Responsive user cards
- Pagination for large result sets

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Cross-browser compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
