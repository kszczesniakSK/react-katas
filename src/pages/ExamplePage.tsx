import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamplePage: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [formInput, setFormInput] = useState('');
  const [timeoutMessage, setTimeoutMessage] = useState('Waiting...');

  // Mock backend request
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
      setData(response.data);
    };
    fetchData();
  }, []);
  
  // Timeout logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutMessage('Timeout Complete!');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form Submitted with input: ${formInput}`);
  };

  return (
    <div>
      <h1>Example Page</h1>

      {/* Form */}
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter something:
          <input
            type="text"
            value={formInput}
            onChange={(e) => setFormInput(e.target.value)}
            placeholder="Enter text"
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Mock backend request data */}
      <div>{data ? `Backend Data: ${data.name}` : 'Loading data...'}</div>

      {/* Timeout message */}
      <div>{timeoutMessage}</div>
    </div>
  );
};

export default ExamplePage;