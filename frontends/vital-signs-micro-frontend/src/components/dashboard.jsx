import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_VITAL_SIGNS } from '../graphql/Mutations';
import VitalSignsForm from './VitalSignsForm';
import VitalSignsList from './VitalSignsList';

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(GET_VITAL_SIGNS);
  const [initialValues, setInitialValues] = useState(null);

  const handleEditClick = (vitalSign) => {
    setInitialValues(vitalSign); 
  };

  const resetInitialValues = () => setInitialValues(null); 

  return (
    <div className="container mt-5">
      <h2>Vital Signs Dashboard</h2>
      <VitalSignsForm initialValues={initialValues} refetch={refetch} resetInitialValues={resetInitialValues} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <VitalSignsList vitalSigns={data.getVitalSigns} setInitialValues={handleEditClick} />}
    </div>
  );
};

export default Dashboard;
