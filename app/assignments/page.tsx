'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_USER_ASSIGNMENTS } from '@/lib/queries';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate, formatTime } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function AssignmentsPage() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: usersData } = useQuery(GET_USERS);
  
  const { data: assignmentsData, loading } = useQuery(GET_USER_ASSIGNMENTS, {
    variables: {
      userId: selectedUserId,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
    skip: !selectedUserId,
  });

  const userOptions = usersData?.users?.map((user: any) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Assignments</h1>
        <p className="text-gray-600 mt-2">View shift assignments for any user</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Select User"
            options={[
              { value: '', label: 'Choose a user...' },
              ...userOptions,
            ]}
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {!selectedUserId ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Please select a user to view their assignments</p>
        </div>
      ) : loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Loading assignments...</p>
        </div>
      ) : assignmentsData?.userAssignments?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No assignments found for this user</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignmentsData?.userAssignments?.map((assignment: any) => (
            <Card key={assignment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{assignment.shift.title}</CardTitle>
                  <Badge variant={assignment.status === 'ASSIGNED' ? 'success' : 'default'}>
                    {assignment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(assignment.shift.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {formatTime(assignment.shift.startTime)} -{' '}
                      {formatTime(assignment.shift.endTime)}
                    </span>
                  </div>
                  {assignment.shift.description && (
                    <p className="text-sm text-gray-500 mt-2">
                      {assignment.shift.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}