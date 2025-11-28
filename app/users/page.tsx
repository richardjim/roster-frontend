'use client';

import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/lib/queries';
import { UserCard } from '@/components/users/UserCard';

export default function UsersPage() {
  const { data, loading } = useQuery(GET_USERS);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
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