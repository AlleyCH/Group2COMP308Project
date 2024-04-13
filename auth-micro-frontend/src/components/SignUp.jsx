import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../graphql/Mutations';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: {
      username,
      password,
    },
    onCompleted: (data) => {
      console.log('Signup successful', data);
      navigate('/login'); // Navigate to login page after successful signup
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  Sign Up
                </button>
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    Error signing up: {error.message}
                  </div>
                )}
              </form>
              <div className="mt-3 text-center">
                <Link to="/login">Already have an account? Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
