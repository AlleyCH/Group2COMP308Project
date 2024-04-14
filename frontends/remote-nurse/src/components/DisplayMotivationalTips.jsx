import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_TIPS = gql`
  {
    getDailyTips {
      id
      message
      createdAt
    }
  }
`;

function DisplayMotivationalTips() {
  const { loading, error, data } = useQuery(GET_TIPS);

  if (loading) return <p>Loading tips...</p>;
  if (error) return <p>Error loading tips!</p>;

  return (
    <div className="container mt-3">
      <h2>Daily Motivational Tips</h2>
      <ul className="list-group">
        {data.getDailyTips.map(({ id, message }) => (
          <li key={id} className="list-group-item">
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayMotivationalTips;
