'use client';

import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/lib/queries';
import { UserCard } from '@/components/users/UserCard';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';

export default function UsersPage() {
  const router = useRouter();
  const { data, loading } = useQuery(GET_USERS);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">
            Manage team members and their roles
          </p>
        </div>
        <Button onClick={() => router.push('/users/create')}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6 border border-blue-200">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600">Total Users</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">
              {data?.users?.length || 0}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6 border border-purple-200">
          <div className="text-center">
            <p className="text-sm font-medium text-purple-600">Admins</p>
            <p className="text-3xl font-bold text-purple-900 mt-2">
              {data?.users?.filter((u: any) => u.role === 'ADMIN').length || 0}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6 border border-green-200">
          <div className="text-center">
            <p className="text-sm font-medium text-green-600">Active Users</p>
            <p className="text-3xl font-bold text-green-900 mt-2">
              {data?.users?.filter((u: any) => u.isActive).length || 0}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading users...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.users?.map((user: any) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}