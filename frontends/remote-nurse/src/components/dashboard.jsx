import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_VITAL_SIGNS } from '../graphql/Mutations';
import VitalSignsForm from './VitalSignsForm';
import VitalSignsList from './VitalSignsList';
import DisplayMotivationalTips from './DisplayMotivationalTips'; 
import AddMotivationalTip from './AddMotivationalTip';

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(GET_VITAL_SIGNS);
  const [initialValues, setInitialValues] = useState(null);

  const handleEditClick = (vitalSign) => {
    setInitialValues(vitalSign); 
  };

  const resetInitialValues = () => setInitialValues(null); 

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Vital Signs</h3>
          <VitalSignsForm initialValues={initialValues} refetch={refetch} resetInitialValues={resetInitialValues} />
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <VitalSignsList vitalSigns={data.getVitalSigns} setInitialValues={handleEditClick} />}
        </div>
        <div className="col-md-6">
          <h3>Motivational Tips</h3>
          <AddMotivationalTip />
          <DisplayMotivationalTips />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
