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
      assignments {
        id
        user {
          id
          firstName
          lastName
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
    }
  }
`;

export const GET_USER_ASSIGNMENTS = gql`
  query GetUserAssignments($userId: String!, $startDate: DateTime, $endDate: DateTime) {
    userAssignments(userId: $userId, startDate: $startDate, endDate: $endDate) {
      id
      status
      assignedAt
      shift {
        id
        date
        startTime
        endTime
        title
        description
      }
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