'use client';

import { Shift } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';

interface ShiftCardProps {
  shift: Shift;
  onClick?: () => void;
}

export function ShiftCard({ shift, onClick }: ShiftCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{shift.title}</h3>
        
        <div className="text-sm text-gray-600">
          <div className="font-medium">{formatDate(shift.date)}</div>
          <div className="mt-1">
            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
          </div>
        </div>

        {shift.description && (
          <p className="text-sm text-gray-500 line-clamp-2">
            {shift.description}
          </p>
        )}

        {shift.isOpen && (
          <div className="pt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}