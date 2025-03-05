import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DTLanding() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [task, setTask] = useState<{ task: string; date: string } | undefined>(undefined);

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: message }),
    });
    const json = await response.json();
    setTask({ task: message, date: formatDate(new Date()) });
    if (json['message'] === 'Task added successfully') {
      setError('Task Added Successfully');
    } else {
      setError('Error while processing the request');
    }
    setTimeout(() => {
      setError('');
    }, 2000);
  }

  const fetchTasks = async (start: string, end: string) => {
    try {
      const response = await fetch(`http://localhost:5000/getTasksByDate?start=${start}&end=${end}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks.');
      }
      const data = await response.json();
      if (data && data.length !== 0) {
        setTask(data[0]);
        setMessage(data[0].task)
        sessionStorage.setItem('TodayTask', JSON.stringify(data[0]));
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching tasks.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    const todayTask = sessionStorage.getItem('TodayTask');
    if (todayTask) {
      setTask(JSON.parse(todayTask));
    setMessage(JSON.parse(todayTask).task);
    } else {
      fetchTasks(formatDate(new Date()), formatDate(new Date()));
    }
  }, []);

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/updateTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: message, date: formatDate(new Date())}),
      });
      if (!response.ok) {
        throw new Error("Failed to update task.");
      }
      setTask({ task: message, date: formatDate(new Date()) });
      sessionStorage.setItem('TodayTask',JSON.stringify(task))
      setError("Task Updated Successfully");
    } catch (error) {
      console.error(error);
      setMessage(task.task)
      setError("Error updating task.");
    }
    setTimeout(() => setError(""), 3000);
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '200px',
    padding: '12px',
    fontSize: '18px',
    marginBottom: '20px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    textAlign: 'left',
    verticalAlign: 'top',
    resize: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 25px',
    marginRight:"1%",
    fontSize: '18px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const errorStyle: React.CSSProperties = {
    color: error.startsWith('Task') ? 'green' : 'red',
    marginTop: '10px',
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#007BFF',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
    display: 'inline-block',
  };

  return (
    <div style={containerStyle}>
      <h2>Daily Task Tracker</h2>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <textarea
          style={inputStyle}
          maxLength={2048}
          placeholder="Enter the task(s) done today"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {task && (
          <button
            type="button"
            style={{ ...buttonStyle, backgroundColor: '#FFC107' }}
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button style={buttonStyle} disabled={message === ''}>
          Submit
        </button>
      </form>
      <p style={errorStyle}>{error !== '' && error}</p>
      <hr />
      <Link to="/dateTasks" style={linkStyle}>
        View Tasks by Date Range
      </Link>
    </div>
  );
}
