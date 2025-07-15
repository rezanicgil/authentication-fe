import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { userApi } from '../../services/api';
import type { SearchFilters as SearchFiltersType, SearchResponse } from '../../types';
import SearchFilters from './SearchFilters';
import UserCard from './UserCard';
import Button from '../ui/Button';

const UserSearch: React.FC = () => {
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentFilters, setCurrentFilters] = useState<SearchFiltersType>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });

  const searchUsers = async (filters: SearchFiltersType) => {
    setLoading(true);
    setError('');

    try {
      const response = await userApi.search(filters);
      setSearchResponse(response);
      setCurrentFilters(filters);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters: SearchFiltersType) => {
    searchUsers(filters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...currentFilters, page };
    searchUsers(newFilters);
  };

  useEffect(() => {
    searchUsers(currentFilters);
  }, [currentFilters]);

  const renderPagination = () => {
    if (!searchResponse?.pagination) return null;

    const { page, totalPages, hasPrev, hasNext } = searchResponse.pagination;

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPrev}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNext}
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing page <span className="font-medium">{page}</span> of{' '}
              <span className="font-medium">{totalPages}</span>
              {' '}({searchResponse.pagination.total} total results)
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={!hasPrev}
                icon={ChevronLeft}
                className="rounded-r-none"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={!hasNext}
                icon={ChevronRight}
                className="rounded-l-none"
              >
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
            <p className="mt-2 text-gray-600">Discover and connect with users in our community</p>
          </div>

          <SearchFilters onFiltersChange={handleFiltersChange} loading={loading} />

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {searchResponse && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2 h-5 w-5" />
                  <span>
                    {searchResponse.pagination.total} user{searchResponse.pagination.total !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="h-3 w-full bg-gray-200 rounded"></div>
                          <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchResponse.users.length > 0 ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResponse.users.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                  {renderPagination()}
                </>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No users found</h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your search filters to find more users.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;