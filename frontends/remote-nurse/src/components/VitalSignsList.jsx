import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_VITAL_SIGNS } from '../graphql/Mutations';

const VitalSignsList = ({ setInitialValues }) => {
  const { loading, error, data } = useQuery(GET_VITAL_SIGNS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Vital Signs List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Info</th>
            <th>Temperature</th>
            <th>Heart Rate</th>
            <th>Blood Pressure</th>
            <th>Respiratory Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.getVitalSigns.map((vitalSign) => (
            <tr key={vitalSign.id}>
              <td>{vitalSign.info}</td>
              <td>{vitalSign.temperature}</td>
              <td>{vitalSign.heartRate}</td>
              <td>{vitalSign.bloodPressure}</td>
              <td>{vitalSign.respiratoryRate}</td>
              <td>
                {setInitialValues && (
                  <button className="btn btn-primary" onClick={() => setInitialValues(vitalSign)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VitalSignsList;
