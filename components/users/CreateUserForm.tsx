'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_USERS } from '@/lib/mutations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { UserRole } from '@/types';

interface CreateUserFormProps {
  onSuccess?: () => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: UserRole.USER,
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: UserRole.USER,
      });
      onSuccess?.();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      variables: {
        createUserInput: formData,
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="user@example.com"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="John"
        />

        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Doe"
        />
      </div>

      <Select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          { value: UserRole.USER, label: 'User' },
          { value: UserRole.ADMIN, label: 'Admin' },
        ]}
      />

      {error && (
        <Alert variant="error">
          <p className="text-sm">{error.message}</p>
        </Alert>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
}