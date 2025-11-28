'use client';

import { useRouter } from 'next/navigation';
import { Shift } from '@/types';
import { ShiftCard } from './ShiftCard';

interface ShiftListProps {
  shifts: Shift[];
  title?: string;
}

export function ShiftList({ shifts, title }: ShiftListProps) {
  const router = useRouter();

  if (shifts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-500">No shifts found</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            shift={shift}
            onClick={() => router.push(`/shifts/${shift.id}`)}
          />
        ))}
      </div>
    </div>
  );
}