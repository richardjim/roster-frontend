'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import { GET_SHIFT } from '@/lib/queries';
import { REMOVE_ASSIGNMENT, REMOVE_SHIFT } from '@/lib/mutations';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AssignUserModal } from '@/components/shifts/AssignUserModal';
import { RepeatShiftModal } from '@/components/shifts/RepeatShiftModal';
import { UnavailabilityModal } from '@/components/shifts/UnavailabilityModal';
import { formatDate, formatTime } from '@/lib/utils';
import { Calendar, Clock, Users, ArrowLeft, Trash2, UserPlus, Repeat, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function ShiftDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shiftId = params.id as string;
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [showUnavailabilityModal, setShowUnavailabilityModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

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

  const handleMarkUnavailable = (userId: string) => {
    setSelectedUserId(userId);
    setShowUnavailabilityModal(true);
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

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{shift.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {shift.isOpen && (
              <Badge variant="success">
                Open - {availableSpots} spot{availableSpots !== 1 ? 's' : ''} available
              </Badge>
            )}
            {shift.isRecurring && (
              <Badge variant="info">Recurring</Badge>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={() => setShowAssignModal(true)}
            disabled={!shift.isOpen}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Assign User
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowRepeatModal(true)}
          >
            <Repeat className="w-4 h-4 mr-2" />
            Repeat
          </Button>
          <Button variant="danger" onClick={handleDeleteShift}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shift Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{formatDate(shift.date)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-medium text-gray-900">
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
            <div className="flex justify-between items-center">
              <CardTitle>Assigned Users</CardTitle>
              <span className="text-sm text-gray-500">
                {shift.assignments?.length || 0} user{shift.assignments?.length !== 1 ? 's' : ''}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {shift.assignments && shift.assignments.length > 0 ? (
              <div className="space-y-3">
                {shift.assignments.map((assignment: any) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {assignment.user.firstName} {assignment.user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {assignment.user.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Assigned: {new Date(assignment.assignedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkUnavailable(assignment.user.id)}
                        title="Mark unavailable"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveAssignment(assignment.id)}
                        title="Remove assignment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No users assigned yet</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3"
                  onClick={() => setShowAssignModal(true)}
                  disabled={!shift.isOpen}
                >
                  Assign First User
                </Button>
              </div>
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

      {showRepeatModal && (
        <RepeatShiftModal
          isOpen={showRepeatModal}
          onClose={() => setShowRepeatModal(false)}
          shiftId={shiftId}
          shiftTitle={shift.title}
        />
      )}

      {showUnavailabilityModal && (
        <UnavailabilityModal
          isOpen={showUnavailabilityModal}
          onClose={() => {
            setShowUnavailabilityModal(false);
            setSelectedUserId('');
          }}
          shiftId={shiftId}
          userId={selectedUserId}
          shiftTitle={shift.title}
        />
      )}
    </div>
  );
}