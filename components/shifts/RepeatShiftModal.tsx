'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_SHIFTS } from '@/lib/queries';
import { REPEAT_SHIFT } from '@/lib/mutations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';

interface RepeatShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shiftId: string;
  shiftTitle: string;
}

export function RepeatShiftModal({
  isOpen,
  onClose,
  shiftId,
  shiftTitle,
}: RepeatShiftModalProps) {
  const [dates, setDates] = useState<string[]>(['']);
  const [repeatShift, { loading, error }] = useMutation(REPEAT_SHIFT, {
    refetchQueries: [{ query: GET_SHIFTS }],
    onCompleted: () => {
      onClose();
      setDates(['']);
    },
  });

  const handleAddDate = () => {
    setDates([...dates, '']);
  };

  const handleRemoveDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validDates = dates.filter((d) => d);
    
    if (validDates.length === 0) {
      return;
    }

    await repeatShift({
      variables: {
        repeatShiftInput: {
          shiftId,
          dates: validDates,
        },
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Repeat Shift" className="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Alert variant="info">
          Repeating: <strong>{shiftTitle}</strong>
        </Alert>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Select dates to repeat this shift:
          </label>
          {dates.map((date, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required
              />
              {dates.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveDate(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddDate}
          >
            Add Another Date
          </Button>
        </div>

        {error && (
          <Alert variant="error">
            <p className="text-sm">{error.message}</p>
          </Alert>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Repeating...' : `Repeat Shift (${dates.filter(d => d).length} dates)`}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}