import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Save } from 'lucide-react';
import { userApi } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import type { ProfileUpdateRequest } from '../../types';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  city?: string;
  country?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  bio?: string;
  interestsText?: string;
  skillsText?: string;
}

const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return '';
  
  // If it's already in YYYY-MM-DD format, return as is
  if (dateString.includes('-') && dateString.length === 10) return dateString;
  
  // If it's in DD/MM/YYYY format, convert to YYYY-MM-DD for date input
  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  
  // Try to parse as date and format as YYYY-MM-DD
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const formatDateForApi = (dateString?: string): string => {
  if (!dateString) return '';
  
  // Date input already provides YYYY-MM-DD format, so just return it
  return dateString;
};

const ProfileForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      city: user?.city || '',
      country: user?.country || '',
      gender: user?.gender || undefined,
      dateOfBirth: formatDateForInput(user?.dateOfBirth) || '',
      bio: user?.bio || '',
      interestsText: user?.interests?.join(', ') || '',
      skillsText: user?.skills?.join(', ') || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      const profileData: ProfileUpdateRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        country: data.country,
        gender: data.gender,
        dateOfBirth: formatDateForApi(data.dateOfBirth),
        bio: data.bio,
        interests: data.interestsText?.split(',').map(item => item.trim()).filter(Boolean) || [],
        skills: data.skillsText?.split(',').map(item => item.trim()).filter(Boolean) || [],
      };

      const response = await userApi.updateProfile(profileData);
      updateUser(response.user);
      setSuccessMessage('Profile updated successfully!');
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{apiError}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              {...register('firstName', { required: 'First name is required' })}
              error={errors.firstName?.message}
              required
            />
            <Input
              label="Last Name"
              {...register('lastName', { required: 'Last name is required' })}
              error={errors.lastName?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              {...register('city')}
              error={errors.city?.message}
            />
            <Input
              label="Country"
              {...register('country')}
              error={errors.country?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                {...register('gender')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
            <Input
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth')}
              error={errors.dateOfBirth?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              {...register('bio', { maxLength: { value: 500, message: 'Bio must be less than 500 characters' } })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>

          <Input
            label="Interests"
            {...register('interestsText')}
            error={errors.interestsText?.message}
            placeholder="e.g., Photography, Hiking, Cooking (comma-separated)"
          />

          <Input
            label="Skills"
            {...register('skillsText')}
            error={errors.skillsText?.message}
            placeholder="e.g., JavaScript, Design, Marketing (comma-separated)"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;