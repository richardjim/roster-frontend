'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import { GET_SHIFT } from '@/lib/queries';
import { REMOVE_ASSIGNMENT, REMOVE_SHIFT } from '@/lib/mutations';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AssignUserModal } from '@/components/shifts/AssignUserModal';
import { formatDate, formatTime } from '@/lib/utils';
import { Calendar, Clock, Users, ArrowLeft, Trash2, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function ShiftDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shiftId = params.id as string;
  const [showAssignModal, setShowAssignModal] = useState(false);

  const { data, loading, refetch } = useQuery(GET_SHIFT, {
    variables: { id: shiftId },
  });

  const [removeAssignment] = useMutation(REMOVE_ASSIGNMENT, {
    onCompleted: () => refetch(),
  });

  const [removeShift] = useMutation(REMOVE_SHIFT, {
    onCompleted: () => router.push('/shifts'),
  });

  const handleRemoveAssignment = async (assignmentId: string) => {
    if (confirm('Are you sure you want to remove this assignment?')) {
      await removeAssignment({ variables: { id: assignmentId } });
    }
  };

  const handleDeleteShift = async () => {
    if (confirm('Are you sure you want to delete this shift? This action cannot be undone.')) {
      await removeShift({ variables: { id: shiftId } });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading shift details...</p>
      </div>
    );
  }

  const shift = data?.shift;

  if (!shift) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Shift not found</p>
      </div>
    );
  }

  const availableSpots = shift.maxAssignments - (shift.assignmentCount || 0);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/shifts"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Shifts
        </Link>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{shift.title}</h1>
          {shift.isOpen && (
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
              Open - {availableSpots} spot{availableSpots !== 1 ? 's' : ''} available
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => setShowAssignModal(true)}
            disabled={!shift.isOpen}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Assign User
          </Button>
          <Button variant="danger" onClick={handleDeleteShift}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Shift
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shift Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(shift.date)}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <Users className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-medium">
                    {shift.assignmentCount || 0} / {shift.maxAssignments} assigned
                  </p>
                </div>
              </div>
              {shift.description && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700 mt-1">{shift.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Users</CardTitle>
          </CardHeader>
          <CardContent>
            {shift.assignments && shift.assignments.length > 0 ? (
              <div className="space-y-3">
                {shift.assignments.map((assignment: any) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {assignment.user.firstName} {assignment.user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {assignment.user.email}
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveAssignment(assignment.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No users assigned yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {showAssignModal && (
        <AssignUserModal
          shiftId={shiftId}
          onClose={() => setShowAssignModal(false)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
}