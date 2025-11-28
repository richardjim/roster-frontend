'use client';

import { useRouter } from 'next/navigation';
import { CreateUserForm } from '@/components/users/CreateUserForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/users"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Users
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <CreateUserForm onSuccess={() => router.push('/users')} />
      </div>
    </div>
  );
}