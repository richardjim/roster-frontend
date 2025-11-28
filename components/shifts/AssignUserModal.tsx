'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ASSIGN_USER_TO_SHIFT } from '@/lib/mutations';
import { GET_USERS } from '@/lib/queries';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { X } from 'lucide-react';

interface AssignUserModalProps {
  shiftId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function AssignUserModal({ shiftId, onClose, onSuccess }: AssignUserModalProps) {
  const [selectedUserId, setSelectedUserId] = useState('');

  const { data: usersData } = useQuery(GET_USERS);
  const [assignUser, { loading, error }] = useMutation(ASSIGN_USER_TO_SHIFT, {
    onCompleted: () => {
      onSuccess();
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;

    await assignUser({
      variables: {
        createAssignmentInput: {
          userId: selectedUserId,
          shiftId,
        },
      },
    });
  };

  const userOptions = usersData?.users
    ?.filter((user: any) => user.isActive)
    .map((user: any) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    })) || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Assign User to Shift</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Select User"
            options={[
              { value: '', label: 'Choose a user...' },
              ...userOptions,
            ]}
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading || !selectedUserId} className="flex-1">
              {loading ? 'Assigning...' : 'Assign User'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}