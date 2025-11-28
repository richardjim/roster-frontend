export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum AssignmentStatus {
  ASSIGNED = 'ASSIGNED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  maxAssignments: number;
  isRecurring: boolean;
  assignmentCount?: number;
  isOpen?: boolean;
  assignments?: ShiftAssignment[];
}

export interface ShiftAssignment {
  id: string;
  userId: string;
  shiftId: string;
  status: AssignmentStatus;
  assignedAt: string;
  user: User;
  shift: Shift;
}