import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      firstName
      lastName
      role
    }
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
      }
      shift {
        id
        title
        date
      }
    }
  }
`;

export const REMOVE_ASSIGNMENT = gql`
  mutation RemoveAssignment($id: String!) {
    removeAssignment(id: $id)
  }
`;

export const REPEAT_SHIFT = gql`
  mutation RepeatShift($repeatShiftInput: RepeatShiftInput!) {
    repeatShift(repeatShiftInput: $repeatShiftInput) {
      id
      date
      title
      isRecurring
    }
  }
`;

export const MARK_UNAVAILABLE = gql`
  mutation MarkUnavailable($createUnavailabilityInput: CreateUnavailabilityInput!) {
    markUnavailable(createUnavailabilityInput: $createUnavailabilityInput) {
      id
      reason
      status
    }
  }
`;

export const REMOVE_SHIFT = gql`
  mutation RemoveShift($id: String!) {
    removeShift(id: $id)
  }
`;