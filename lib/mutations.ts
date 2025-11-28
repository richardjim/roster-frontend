import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      firstName
      lastName
      role
      isActive
      createdAt
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id)
  }
`;

export const CREATE_SHIFT = gql`
  mutation CreateShift($createShiftInput: CreateShiftInput!) {
    createShift(createShiftInput: $createShiftInput) {
      id
      date
      startTime
      endTime
      title
      description
      maxAssignments
      isRecurring
      createdAt
    }
  }
`;

export const REMOVE_SHIFT = gql`
  mutation RemoveShift($id: String!) {
    removeShift(id: $id)
  }
`;

export const REPEAT_SHIFT = gql`
  mutation RepeatShift($repeatShiftInput: RepeatShiftInput!) {
    repeatShift(repeatShiftInput: $repeatShiftInput) {
      id
      date
      title
      startTime
      endTime
      maxAssignments
      isRecurring
    }
  }
`;

export const ASSIGN_USER_TO_SHIFT = gql`
  mutation AssignUserToShift($createAssignmentInput: CreateAssignmentInput!) {
    assignUserToShift(createAssignmentInput: $createAssignmentInput) {
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

export const REMOVE_ASSIGNMENT = gql`
  mutation RemoveAssignment($id: String!) {
    removeAssignment(id: $id)
  }
`;

export const MARK_UNAVAILABLE = gql`
  mutation MarkUnavailable($createUnavailabilityInput: CreateUnavailabilityInput!) {
    markUnavailable(createUnavailabilityInput: $createUnavailabilityInput) {
      id
      reason
      status
      createdAt
      user {
        id
        firstName
        lastName
      }
      shift {
        id
        title
        date
      }
    }
  }
`;