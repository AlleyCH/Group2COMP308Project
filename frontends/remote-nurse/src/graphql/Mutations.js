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
      info
    }
  }
`;

export const ADD_VITAL_SIGN = gql`
  mutation AddVitalSign($temperature: Float!, $heartRate: Float!, $bloodPressure: String!, $respiratoryRate: Float!, $info : String!) {
    addVitalSigns(temperature: $temperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate, info: $info) {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
      info
    }
  }
`;

export const UPDATE_VITAL_SIGN = gql`
  mutation UpdateVitalSign($id: ID!, $temperature: Float, $heartRate: Float, $bloodPressure: String, $respiratoryRate: Float, $info: String) {
    updateVitalSigns(id: $id, temperature: $temperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate, info: $info) {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
      info
    }
  }
`;
