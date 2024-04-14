import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SUBMIT_SYMPTOM_CHECKLIST = gql`
  mutation SubmitSymptomChecklist($userId: ID!, $symptoms: [String!]!) {
    submitSymptomChecklist(userId: $userId, symptoms: $symptoms) {
      id
      symptoms
    }
  }
`;

const SymptomChecklistForm = () => {
    const [userId, setUserId] = useState('');  
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [submitChecklist, { loading, error }] = useMutation(SUBMIT_SYMPTOM_CHECKLIST);

    const handleSymptomChange = (symptom) => {
        const newSymptoms = selectedSymptoms.includes(symptom)
            ? selectedSymptoms.filter(s => s !== symptom)
            : [...selectedSymptoms, symptom];
        setSelectedSymptoms(newSymptoms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            alert("Invalid user ID format. User ID must be a 24-character hex string.");
            return;
        }
        submitChecklist({ variables: { userId, symptoms: selectedSymptoms } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error submitting symptom checklist: {error.message}</p>;

    return (
        <div className="container mt-3">
            <h2>Submit Symptom Checklist</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input type="text" className="form-control" id="userId" value={userId} onChange={e => setUserId(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Symptoms</label>
                    {["Fever", "Cough", "Difficulty Breathing", "Fatigue"].map((symptom, index) => (
                        <div key={index} className="form-check">
                            <input className="form-check-input" type="checkbox" value={symptom} id={`symptom-${index}`}
                                checked={selectedSymptoms.includes(symptom)}
                                onChange={() => handleSymptomChange(symptom)} />
                            <label className="form-check-label" htmlFor={`symptom-${index}`}>
                                {symptom}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-primary">Submit Checklist</button>
            </form>
        </div>
    );
};

export default SymptomChecklistForm;
