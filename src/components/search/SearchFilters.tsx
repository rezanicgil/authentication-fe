import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Search, Filter, X } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import type { SearchFilters as SearchFiltersType } from '../../types';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFiltersType) => void;
  loading?: boolean;
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const sortByOptions = [
  { value: 'createdAt', label: 'Join Date' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'lastLoginAt', label: 'Last Login' },
];

const sortOrderOptions = [
  { value: 'DESC', label: 'Descending' },
  { value: 'ASC', label: 'Ascending' },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange, loading }) => {
  const { control, handleSubmit, reset, watch } = useForm<SearchFiltersType>({
    defaultValues: {
      search: '',
      city: '',
      country: '',
      gender: undefined,
      minAge: undefined,
      maxAge: undefined,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      page: 1,
      limit: 10,
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: SearchFiltersType) => {
    const cleanedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key as keyof SearchFiltersType] = value;
      }
      return acc;
    }, {} as SearchFiltersType);

    onFiltersChange({ ...cleanedData, page: 1 });
  };

  const handleReset = () => {
    reset();
    onFiltersChange({ page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'DESC' });
  };

  const hasActiveFilters = Object.values(watchedValues).some(
    (value, index) => {
      const keys = Object.keys(watchedValues);
      const key = keys[index];
      if (['page', 'limit', 'sortBy', 'sortOrder'].includes(key)) return false;
      return value !== '' && value !== undefined && value !== null;
    }
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <Filter className="mr-2 h-5 w-5" />
          Search Filters
        </h3>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            icon={X}
          >
            Clear
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Search"
                placeholder="Name or email..."
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="City"
                placeholder="Enter city"
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Country"
                placeholder="Enter country"
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Gender"
                placeholder="Select gender"
                options={genderOptions}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="minAge"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Min Age"
                type="number"
                min="13"
                max="120"
                placeholder="13"
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            )}
          />

          <Controller
            name="maxAge"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Max Age"
                type="number"
                min="13"
                max="120"
                placeholder="120"
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="sortBy"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Sort By"
                options={sortByOptions}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="sortOrder"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Sort Order"
                options={sortOrderOptions}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={loading}
            icon={Search}
          >
            Search Users
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;