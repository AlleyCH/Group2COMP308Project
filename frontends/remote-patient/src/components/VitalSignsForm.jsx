import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_VITAL_SIGN, UPDATE_VITAL_SIGN } from '../graphql/Mutations';


const VitalSignsForm = ({ initialValues, refetch, resetInitialValues }) => {
  const [formState, setFormState] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
    info: 'Daily',
  });

  useEffect(() => {
    if (initialValues) {
      setFormState({ ...initialValues });
    } else {
      setFormState({ temperature: '', heartRate: '', bloodPressure: '', respiratoryRate: '', info: 'Daily' });
    }
  }, [initialValues]);

  const [addVitalSign] = useMutation(ADD_VITAL_SIGN, {
    onCompleted: () => {
      refetch();
      resetForm();
    },
  });

  const [updateVitalSign] = useMutation(UPDATE_VITAL_SIGN, {
    onCompleted: () => {
      refetch();
      resetForm(); 
    },
  });

  const resetForm = () => {
    // Clear form fields
    setFormState({ temperature: '', heartRate: '', bloodPressure: '', respiratoryRate: '',  info: 'Daily' });
    if (resetInitialValues) resetInitialValues();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = {
      temperature: parseFloat(formState.temperature),
      heartRate: parseFloat(formState.heartRate),
      bloodPressure: formState.bloodPressure,
      respiratoryRate: parseFloat(formState.respiratoryRate),
      info: 'Daily',
    };

    if (initialValues) {
      updateVitalSign({ variables: { ...variables, id: initialValues.id } });
    } else {
      // Add mode
      addVitalSign({ variables });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Temperature input */}
      <div className="form-group">
        <label>Temperature</label>
        <input
          type="number"
          step="0.1"
          className="form-control"
          name="temperature"
          value={formState.temperature}
          onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
        />
      </div>
      {/* Heart Rate input */}
      <div className="form-group">
        <label>Heart Rate</label>
        <input
          type="number"
          className="form-control"
          name="heartRate"
          value={formState.heartRate}
          onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
        />
      </div>
      {/* Blood Pressure input */}
      <div className="form-group">
        <label>Blood Pressure</label>
        <input
          type="text"
          className="form-control"
          name="bloodPressure"
          value={formState.bloodPressure}
          onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
        />
      </div>
      {/* Respiratory Rate input */}
      <div className="form-group">
        <label>Respiratory Rate</label>
        <input
          type="number"
          className="form-control"
          name="respiratoryRate"
          value={formState.respiratoryRate}
          onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary">
        {initialValues ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default VitalSignsForm;
