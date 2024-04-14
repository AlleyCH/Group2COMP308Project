import React, { useState } from 'react';
import { useMutation } from '@apollo/client'; // Updated import
import gql from 'graphql-tag';

const ADD_TIP = gql`
  mutation AddMotivationalTip($message: String!) {
    addMotivationalTip(message: $message) {
      id
      message
    }
  }
`;

function AddMotivationalTip() {
  const [message, setMessage] = useState('');
  const [addTip, { data }] = useMutation(ADD_TIP);

  const handleSubmit = (event) => {
    event.preventDefault();
    addTip({ variables: { message } });
    setMessage('');  // Clear the input after submission
  };

  return (
    <div className="container mt-3">
      <h2>Add a Motivational Tip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <input
            type="text"
            className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddMotivationalTip;
