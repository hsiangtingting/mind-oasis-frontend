import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Hello, World! Connected to Oasis');

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/api/health";

    fetch(backendUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.status);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setMessage('Failed to connect to backend, check spring Boot');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mind Oasis</h1>
        <p>
          frontend skeleton
        </p>
        <div style={{ padding: '20px', border: '1px solid #e8edefff', borderRadius: '10px' }}/>
        <p>Back-end Status:{message}</p>
      </header>
    </div>
  );
}

export default App;
