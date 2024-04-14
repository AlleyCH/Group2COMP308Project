import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_EMERGENCY_ALERT = gql`
  mutation AddEmergencyAlert($userId: ID!, $message: String!, $location: String!) {
    addEmergencyAlert(userId: $userId, message: $message, location: $location) {
      id
      message
      location
    }
  }
`;

const EmergencyAlertForm = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState('');
    const [addAlert, { data, loading, error }] = useMutation(ADD_EMERGENCY_ALERT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        addAlert({ variables: { userId, message, location } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( Please try again</p>;

    return (
        <div className="container mt-3">
            <h2>Send Emergency Alert</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input type="text" className="form-control" id="userId" value={userId} onChange={e => setUserId(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <input type="text" className="form-control" id="message" value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" value={location} onChange={e => setLocation(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Send Alert</button>
            </form>
        </div>
    );
};

export default EmergencyAlertForm;
