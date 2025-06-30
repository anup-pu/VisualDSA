import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QueueVisualizer.css';

const MAX_QUEUE_SIZE = 5;

const QueueVisualizer = () => {
  const [value, setValue] = useState('');
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState('');
  const [animating, setAnimating] = useState(false);

  const fetchQueue = async () => {
    try {
      const res = await axios.get('http://localhost:8080/queue/all');
      setQueue(res.data);
    } catch (err) {
      console.error('Error fetching queue:', err);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const enqueue = async () => {
    if (!value) {
      setMessage('⚠️ Please enter a value');
      return;
    }
    if (queue.length >= MAX_QUEUE_SIZE) {
      setMessage('⚠️ Queue Overflow');
      return;
    }

    try {
      setAnimating(true);
      await axios.post(`http://localhost:8080/queue/enqueue?value=${value}`);
      setTimeout(() => {
        setAnimating(false);
        fetchQueue();
      }, 300);
      setValue('');
      setMessage('');
    } catch (err) {
      console.error('Enqueue error:', err);
    }
  };

  const dequeue = async () => {
    if (queue.length === 0) {
      setMessage('⚠️ Queue Underflow');
      return;
    }

    try {
      await axios.delete('http://localhost:8080/queue/dequeue');
      fetchQueue();
      setMessage('');
    } catch (err) {
      console.error('Dequeue error:', err);
    }
  };

  // Queue comes in correct order from backend now — no reverse needed
  const paddedQueue = [...queue];
  while (paddedQueue.length < MAX_QUEUE_SIZE) {
    paddedQueue.push(null);
  }

  return (
    <div className="queue-page">
      <h2>Queue Visualizer</h2>

      <div className="queue-inputs">
        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={enqueue}>Enqueue (Front)</button>
        <button onClick={dequeue}>Dequeue (Rear)</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="queue-wrapper">
        <p className="label left-label">Front</p>
        <div className={`queue-box ${animating ? 'shift' : ''}`}>
          {paddedQueue.map((item, index) => (
            <div className={`queue-item ${item === null ? 'empty' : ''}`} key={index}>
              {item !== null ? item : ''}
            </div>
          ))}
        </div>
        <p className="label right-label">Rear</p>
      </div>
    </div>
  );
};

export default QueueVisualizer;
