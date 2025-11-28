'use client';

import { CreateShiftForm } from '@/components/shifts/CreateShiftForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateShiftPage() {
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

      <h1 className="text-3xl font-bold text-gray-900">Create New Shift</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <CreateShiftForm />
      </div>
    </div>
  );
}