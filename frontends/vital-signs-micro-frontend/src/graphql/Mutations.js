import { gql } from '@apollo/client';

export const GET_VITAL_SIGNS = gql`
  query GetVitalSigns {
    getVitalSigns {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;

export const ADD_VITAL_SIGN = gql`
  mutation AddVitalSign($temperature: Float!, $heartRate: Float!, $bloodPressure: String!, $respiratoryRate: Float!) {
    addVitalSigns(temperature: $temperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;

export const UPDATE_VITAL_SIGN = gql`
  mutation UpdateVitalSign($id: ID!, $temperature: Float, $heartRate: Float, $bloodPressure: String, $respiratoryRate: Float) {
    updateVitalSigns(id: $id, temperature: $temperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;
