'use client';

import { useMemo } from 'react';
import { Shift } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';

interface ShiftCalendarProps {
  shifts: Shift[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export function ShiftCalendar({ shifts, selectedDate, onDateSelect }: ShiftCalendarProps) {
  const currentMonth = selectedDate || new Date();

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const getShiftsForDay = (day: Date) => {
    return shifts.filter((shift) =>
      isSameDay(new Date(shift.date), day)
    );
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-center">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, idx) => {
          const dayShifts = getShiftsForDay(day);
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={idx}
              onClick={() => onDateSelect?.(day)}
              className={cn(
                'min-h-20 p-2 border rounded-lg text-left transition-colors',
                isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                isToday && 'ring-2 ring-blue-500',
                isSelected && 'bg-blue-50 border-blue-300',
                !isCurrentMonth && 'text-gray-400',
                'hover:bg-gray-50'
              )}
            >
              <div className="font-semibold text-sm mb-1">
                {format(day, 'd')}
              </div>
              {dayShifts.length > 0 && (
                <div className="space-y-1">
                  {dayShifts.slice(0, 2).map((shift) => (
                    <div
                      key={shift.id}
                      className={cn(
                        'text-xs px-1 py-0.5 rounded truncate',
                        shift.isOpen
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      )}
                    >
                      {shift.title}
                    </div>
                  ))}
                  {dayShifts.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayShifts.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}