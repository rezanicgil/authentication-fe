import React from 'react';
import { MapPin, Calendar, User as UserIcon, Mail, Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { User } from '../../types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const getAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <UserIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="mr-1 h-4 w-4" />
              {user.email}
            </div>
          </div>
        </div>
        <div className={`rounded-full px-2 py-1 text-xs font-medium ${
          user.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      {user.bio && (
        <p className="mt-3 text-sm text-gray-600">{user.bio}</p>
      )}

      <div className="mt-4 space-y-2">
        {(user.city || user.country) && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-2 h-4 w-4" />
            {[user.city, user.country].filter(Boolean).join(', ')}
          </div>
        )}

        {user.dateOfBirth && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            Age {getAge(user.dateOfBirth)}
          </div>
        )}

        {user.gender && (
          <div className="flex items-center text-sm text-gray-500">
            <UserIcon className="mr-2 h-4 w-4" />
            {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </div>
        )}

        {user.lastLoginAt && (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            Last login: {format(new Date(user.lastLoginAt), 'MMM dd, yyyy')}
          </div>
        )}
      </div>

      {(user.interests && user.interests.length > 0) && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Interests</h4>
          <div className="mt-2 flex flex-wrap gap-1">
            {user.interests.map((interest, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {(user.skills && user.skills.length > 0) && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Skills</h4>
          <div className="mt-2 flex flex-wrap gap-1">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-green-50 px-2 py-1 text-xs text-green-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Joined {format(new Date(user.createdAt), 'MMMM dd, yyyy')}
        </div>
      </div>
    </div>
  );
};

export default UserCard;