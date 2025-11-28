'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MARK_UNAVAILABLE } from '@/lib/mutations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';

interface UnavailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  shiftId: string;
  userId: string;
  shiftTitle: string;
}

export function UnavailabilityModal({
  isOpen,
  onClose,
  shiftId,
  userId,
  shiftTitle,
}: UnavailabilityModalProps) {
  const [reason, setReason] = useState('');

  const [markUnavailable, { loading, error }] = useMutation(MARK_UNAVAILABLE, {
    onCompleted: () => {
      onClose();
      setReason('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await markUnavailable({
      variables: {
        createUnavailabilityInput: {
          userId,
          shiftId,
          reason,
        },
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark Unavailable">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Alert variant="warning">
          You are marking yourself as unavailable for: <strong>{shiftTitle}</strong>
        </Alert>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Please provide a reason for your unavailability..."
            required
            minLength={5}
          />
          <p className="mt-1 text-xs text-gray-500">
            Minimum 5 characters required
          </p>
        </div>

        {error && (
          <Alert variant="error">
            <p className="text-sm">{error.message}</p>
          </Alert>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading || reason.length < 5}>
            {loading ? 'Submitting...' : 'Submit Unavailability'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}