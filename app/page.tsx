'use client';

import { useQuery } from '@apollo/client';
import { GET_OPEN_SHIFTS, GET_SHIFTS } from '@/lib/queries';
import { ShiftList } from '@/components/shifts/ShiftList';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Clock, AlertCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  
  const { 
    data: openShiftsData, 
    loading: openShiftsLoading, 
    error: openShiftsError 
  } = useQuery(GET_OPEN_SHIFTS);
  
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekDate = nextWeek.toISOString().split('T')[0];

  const { 
    data: upcomingShiftsData, 
    loading: upcomingShiftsLoading,
    error: upcomingShiftsError 
  } = useQuery(GET_SHIFTS, {
    variables: {
      filter: {
        startDate: today,
        endDate: nextWeekDate,
      },
    },
  });

  if (openShiftsError || upcomingShiftsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Unable to Connect to Server
          </h2>
          <p className="text-gray-600 mb-6">
            Please make sure the backend server is running
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-600 mb-2">To start the backend:</p>
            <code className="block bg-gray-900 text-gray-100 p-3 rounded text-sm">
              cd roster-backend && npm run start:dev
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={() => router.push('/shifts/create')} size="lg">
          Create Shift
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Total Shifts</p>
              <p className="text-4xl font-bold text-blue-900">
                {upcomingShiftsData?.shifts?.length || 0}
              </p>
            </div>
            <div className="p-4 bg-blue-500 rounded-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Open Shifts</p>
              <p className="text-4xl font-bold text-green-900">
                {openShiftsData?.openShifts?.length || 0}
              </p>
            </div>
            <div className="p-4 bg-green-500 rounded-xl">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1">This Week</p>
              <p className="text-4xl font-bold text-purple-900">
                {upcomingShiftsData?.shifts?.length || 0}
              </p>
            </div>
            <div className="p-4 bg-purple-500 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Open Shifts Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Open Shifts</h2>
        {openShiftsLoading ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-4">Loading open shifts...</p>
          </div>
        ) : openShiftsData?.openShifts?.length > 0 ? (
          <ShiftList shifts={openShiftsData.openShifts} />
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No open shifts available</p>
          </div>
        )}
      </div>

      {/* Upcoming Shifts Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Upcoming Shifts (Next 7 Days)</h2>
        {upcomingShiftsLoading ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-4">Loading upcoming shifts...</p>
          </div>
        ) : upcomingShiftsData?.shifts?.length > 0 ? (
          <ShiftList shifts={upcomingShiftsData.shifts} />
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming shifts</p>
          </div>
        )}
      </div>
    </div>
  );
}