import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_SHIFTS = gql`
  query GetShifts($filter: FilterShiftInput) {
    shifts(filter: $filter) {
      id
      date
      startTime
      endTime
      title
      description
      maxAssignments
      assignmentCount
      isOpen
      createdAt
      updatedAt
      assignments {
        id
        status
        user {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const GET_OPEN_SHIFTS = gql`
  query GetOpenShifts {
    openShifts {
      id
      date
      startTime
      endTime
      title
      description
      maxAssignments
      assignmentCount
      isOpen
      createdAt
      updatedAt
    }
  }
`;

export const GET_SHIFT = gql`
  query GetShift($id: String!) {
    shift(id: $id) {
      id
      date
      startTime
      endTime
      title
      description
      maxAssignments
      assignmentCount
      isOpen
      isRecurring
      createdAt
      updatedAt
      assignments {
        id
        status
        assignedAt
        user {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const GET_USER_ASSIGNMENTS = gql`
  query GetUserAssignments($userId: String!, $startDate: DateTime, $endDate: DateTime) {
    userAssignments(userId: $userId, startDate: $startDate, endDate: $endDate) {
      id
      status
      assignedAt
      createdAt
      shift {
        id
        date
        startTime
        endTime
        title
        description
        maxAssignments
      }
    }
  }
`;

export const GET_SHIFT_ASSIGNMENTS = gql`
  query GetShiftAssignments($shiftId: String!) {
    shiftAssignments(shiftId: $shiftId) {
      id
      status
      assignedAt
      user {
        id
        firstName
        lastName
        email
      }
      shift {
        id
        title
        date
      }
    }
  }
`;

export const GET_ALL_ASSIGNMENTS = gql`
  query GetAllAssignments {
    assignments {
      id
      status
      assignedAt
      user {
        id
        firstName
        lastName
        email
      }
      shift {
        id
        title
        date
        startTime
        endTime
      }
    }
  }
`;