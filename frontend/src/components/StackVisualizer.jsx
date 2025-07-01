import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StackVisualizer.css';

const MAX_STACK_SIZE = 5;

const StackVisualizer = () => {
  const [value, setValue] = useState('');
  const [stack, setStack] = useState([]);
  const [message, setMessage] = useState('');

  const fetchStack = async () => {
    try {
      const res = await axios.get('https://visualdsa-backend.onrender.com/stack/all');
      setStack(res.data);
    } catch (err) {
      console.error('Error fetching stack:', err);
    }
  };

  useEffect(() => {
    fetchStack();
  }, []);

  const push = async () => {
    if (value === '') {
      setMessage('⚠️ Please enter a value');
      return;
    }
    if (stack.length >= MAX_STACK_SIZE) {
      setMessage('⚠️ Stack Overflow');
      return;
    }

    try {
      await axios.post(`https://visualdsa-backend.onrender.com/stack/push?value=${value}`);
      setValue('');
      setMessage('');
      fetchStack();
    } catch (err) {
      console.error('Push error:', err);
    }
  };

  const pop = async () => {
    if (stack.length === 0) {
      setMessage('⚠️ Stack Underflow');
      return;
    }

    try {
      await axios.delete(`https://visualdsa-backend.onrender.com/stack/pop`);
      setMessage('');
      fetchStack();
    } catch (err) {
      console.error('Pop error:', err);
    }
  };

  return (
    <div className="stack-page">
      <h2>Stack Visualizer</h2>

      <div className="stack-inputs">
        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="stack-container">
        <p className="top-label">Top</p>
        <div className="stack-box">
          {[...stack].reverse().map((item, index) => (
            <div className="stack-item" key={index}>
              {item}
            </div>
          ))}
        </div>
        <p className="bottom-label">Bottom</p>
      </div>
    </div>
  );
};

export default StackVisualizer;
