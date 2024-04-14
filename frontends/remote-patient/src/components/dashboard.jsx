import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_VITAL_SIGNS } from '../graphql/Mutations';
import VitalSignsForm from './VitalSignsForm';
import VitalSignsList from './VitalSignsList';
import EmergencyAlertForm from './EmergencyAlertForm';
import SymptomChecklistForm from './SymptomCheckListForm';

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(GET_VITAL_SIGNS);
  const [initialValues, setInitialValues] = useState(null);

  const handleEditClick = (vitalSign) => {
    setInitialValues(vitalSign); 
  };

  const resetInitialValues = () => setInitialValues(null); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <VitalSignsForm initialValues={initialValues} resetInitialValues={resetInitialValues} />
          <VitalSignsList vitalSigns={data?.vitalSigns} onEditClick={handleEditClick} />
        </div>
        <div className="col-md-6">
          <EmergencyAlertForm />
          <SymptomChecklistForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
