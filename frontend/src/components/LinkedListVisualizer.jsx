import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LinkedListVisualizer.css';

const MAX_LIST_SIZE = 8;

const LinkedListVisualizer = () => {
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [list, setList] = useState([]);
  const [message, setMessage] = useState('');
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://visualdsa-backend.onrender.com/linkedlist/all');
      setList(res.data);
    } catch (err) {
      console.error('Error fetching linked list:', err);
      setMessage('⚠️ Failed to load list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const insertNode = async () => {
    if (!value || index === '') {
      setMessage('⚠️ Enter value and index');
      return;
    }
    if (list.length >= MAX_LIST_SIZE) {
      setMessage('⚠️ List Overflow');
      return;
    }

    try {
      setAnimating(true);
      setLoading(true);
      const response = await axios.post(`https://visualdsa-backend.onrender.com/linkedlist/insert?value=${value}&index=${index}`);
      
      // Check if insertion failed by comparing length (invalid index returns unchanged list)
      if (response.data.length === list.length) {
        setMessage('⚠️ Invalid index entered');
      } else {
        setMessage('');
        fetchList();
      }
    } catch (err) {
      console.error('Insert error:', err);
      setMessage('⚠️ Error during insertion');
    } finally {
      setTimeout(() => setAnimating(false), 300);
      setLoading(false);
      setValue('');
      setIndex('');
    }
  };

  const deleteNode = async () => {
    if (index === '') {
      setMessage('⚠️ Enter index to delete');
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`https://visualdsa-backend.onrender.com/linkedlist/delete?index=${index}`);
      fetchList();
      setMessage('');
    } catch (err) {
      console.error('Delete error:', err);
      setMessage('⚠️ Error during deletion');
    } finally {
      setIndex('');
      setLoading(false);
    }
  };

  return (
    <div className="linkedlist-page">
      <h2>Linked List Visualizer</h2>

      <div className="ll-inputs">
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button onClick={insertNode}>Insert</button>
        <button onClick={deleteNode}>Delete</button>
      </div>

      {message && <p className="message">{message}</p>}

      {loading ? (
        <div className="loader steady-loader"></div>
      ) : (
        <div className="ll-wrapper">
          <div className={`ll-box ${animating ? 'shift' : ''}`}>
            {list.length > 0 && (
              <div className="ll-head">
                <div className="head-label">Head →</div>
              </div>
            )}
            {list.map((item, index) => (
              <div className="ll-node" key={index}>
                <div className="value">{item}</div>
                <div className="arrow">→</div>
              </div>
            ))}
            {list.length > 0 && (
              <div className="ll-null">
                <div className="null-text">null</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedListVisualizer;
