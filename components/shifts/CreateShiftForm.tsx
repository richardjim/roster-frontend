'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_SHIFT } from '@/lib/mutations';
import { GET_SHIFTS } from '@/lib/queries';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function CreateShiftForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    maxAssignments: 1,
  });

  const [createShift, { loading, error }] = useMutation(CREATE_SHIFT, {
    refetchQueries: [{ query: GET_SHIFTS }],
    onCompleted: () => {
      router.push('/shifts');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createShift({
      variables: {
        createShiftInput: {
          ...formData,
          maxAssignments: Number(formData.maxAssignments),
        },
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <Input
          label="Shift Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., Morning Shift"
          className="text-base"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          rows={4}
          placeholder="Add shift details (optional)"
        />
      </div>

      <div>
        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="text-base"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Time"
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="text-base"
        />

        <Input
          label="End Time"
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="text-base"
        />
      </div>

      <div>
        <Input
          label="Maximum Assignments"
          name="maxAssignments"
          type="number"
          min="1"
          value={formData.maxAssignments}
          onChange={handleChange}
          required
          className="text-base"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error.message}</p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="px-8">
          {loading ? 'Creating...' : 'Create Shift'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}