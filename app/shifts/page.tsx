'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SHIFTS } from '@/lib/queries';
import { ShiftList } from '@/components/shifts/ShiftList';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { Plus, Filter, X } from 'lucide-react';

export default function ShiftsPage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading, refetch } = useQuery(GET_SHIFTS, {
    variables: {
      filter: {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        isOpen: showOpenOnly || undefined,
      },
    },
  });

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setShowOpenOnly(false);
    refetch();
  };

  const hasActiveFilters = startDate || endDate || showOpenOnly;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Shifts</h1>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {[startDate, endDate, showOpenOnly].filter(Boolean).length}
              </span>
            )}
          </Button>
          <Button onClick={() => router.push('/shifts/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Shift
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filter Shifts</h2>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex items-end">
              <label className="flex items-center space-x-3 cursor-pointer h-11">
                <input
                  type="checkbox"
                  checked={showOpenOnly}
                  onChange={(e) => setShowOpenOnly(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show open shifts only
                </span>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={() => refetch()} size="sm">
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-4">Loading shifts...</p>
        </div>
      ) : (
        <ShiftList shifts={data?.shifts || []} />
      )}
    </div>
  );
}