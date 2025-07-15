export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  city?: string;
  country?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  bio?: string;
  interests?: string[];
  skills?: string[];
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SearchFilters {
  search?: string;
  city?: string;
  country?: string;
  gender?: 'male' | 'female' | 'other';
  minAge?: number;
  maxAge?: number;
  interests?: string[];
  skills?: string[];
  joinedAfter?: string;
  joinedBefore?: string;
  lastActiveAfter?: string;
  sortBy?: 'firstName' | 'lastName' | 'createdAt' | 'lastLoginAt';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  bio?: string;
  interests?: string[];
  skills?: string[];
}

export interface ProfileUpdateResponse {
  user: User;
}