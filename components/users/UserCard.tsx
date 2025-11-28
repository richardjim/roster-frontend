'use client';

import { User } from '@/types';
import { Mail, Shield, User as UserIcon } from 'lucide-react';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{user.email}</span>
          </div>
          {user.role === 'ADMIN' && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}