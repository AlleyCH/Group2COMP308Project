import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, Form, Container, ListGroup, Alert } from 'react-bootstrap';

const GET_VITALS_QUERY = gql`
  query GetVitals {
    vitals {
      id
      vitalName
      vitalValue
      vitalUnit
    }
  }
`;

const ADD_VITAL_MUTATION = gql`
  mutation AddVital($vitalName: String!, $vitalValue: Float!, $vitalUnit: String!) {
    addVital(vital: { vitalName: $vitalName, vitalValue: $vitalValue, vitalUnit: $vitalUnit }) {
      id
      vitalName
      vitalValue
      vitalUnit
    }
  }
`;

function VitalsComponent() {
  const { loading, error, data } = useQuery(GET_VITALS_QUERY, {
    context: { credentials: 'include' },
  });

  const [addVital, { loading: adding }] = useMutation(ADD_VITAL_MUTATION, {
    refetchQueries: [GET_VITALS_QUERY],
  });

  const [vitalName, setVitalName] = useState('');
  const [vitalValue, setVitalValue] = useState('');
  const [vitalUnit, setVitalUnit] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vitalName.trim() || !vitalValue.trim() || !vitalUnit.trim()) return;
    await addVital({
        variables: { vitalName, vitalValue: parseFloat(vitalValue), vitalUnit },
      });
      setVitalName('');
      setVitalValue('');
      setVitalUnit('');
    };
  
    // if (loading) return <p>Loading...</p>;
    // if (error) return <Alert variant="danger">Error :( Please make sure you're logged in.</Alert>;
  
    return (
      <Container>
        <h2>Add a New Vital</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Vital Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter vital name"
              value={vitalName}
              onChange={(e) => setVitalName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vital Value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter vital value"
              value={vitalValue}
              onChange={(e) => setVitalValue(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vital Unit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter vital unit"
              value={vitalUnit}
              onChange={(e) => setVitalUnit(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={adding}>
            Add Vital
          </Button>
        </Form>
  
        <h3 className="mt-4">Vital List</h3>
        <ListGroup>
          {data && data.vitals.map(({ id, vitalName, vitalValue, vitalUnit }) => (
            <ListGroup.Item key={id}>
              <strong>{vitalName}</strong>: {vitalValue} {vitalUnit}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
  
  export default VitalsComponent;
  
