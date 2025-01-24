import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DateTasks() {
  const [tasks, setTasks] = useState<{ task: string; date: string }[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editContent, setEditContent] = useState("");

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  // Utility to get the past 5 days' dates
  const getDefaultDates = () => {
    const today = new Date();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(today.getDate() - 5);

    return {
      start: formatDate(fiveDaysAgo),
      end: formatDate(today),
    };
  };

  // Fetch tasks from backend
  const fetchTasks = async (start: string, end: string) => {
    console.log(start,end)
    try {
      const response = await fetch(`http://localhost:5000/getTasksByDate?start=${start}&end=${end}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks.");
      }
      const data = await response.json();
      setTasks(data.reverse());
    } catch (error) {
      console.error(error);
      setError("Error fetching tasks.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleEditTask = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const updatingDate = new Date(editDate);
    const updatingDateString = formatDate(updatingDate)
    try {
      const response = await fetch(`http://localhost:5000/updateTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: editContent, date: updatingDateString}),
      });
      if (!response.ok) {
        throw new Error("Failed to update task.");
      }
      const updatedTasks = tasks.map((task) =>
        task.date === editDate ? { ...task, task: editContent } : task
      );
      setTasks(updatedTasks);
      setEditContent("");
      setEditDate("");
    } catch (error) {
      console.error(error);
      setError("Error updating task.");
    }
    setTimeout(() => setError(""), 3000);
  }

  // Handle date range submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    fetchTasks(startDate, endDate);
  };

  // Fetch default tasks on component mount
  useEffect(() => {
    const sessiontasks = sessionStorage.getItem('DailyTasks');
    const { start, end } = getDefaultDates();
    setStartDate(start);
    setEndDate(end);
    if(sessiontasks)
    setTasks(JSON.parse(sessiontasks));
    else
    {
        fetchTasks(start, end);
        sessionStorage.setItem('DailyTasks',JSON.stringify(tasks))
    }
  }, []);

  useEffect(()=>{

  },[editDate])

  const containerStyle: React.CSSProperties = {
    padding: "3%",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  };

  const inputStyle: React.CSSProperties = {
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    marginTop: "10px",
  };

  const taskContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  const EditinputStyle: React.CSSProperties = {
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
    
  const taskDetailsStyle: React.CSSProperties = {
    flex: "1",
    marginRight: "10px",
  };

  const buttonEditStyle: React.CSSProperties = {
    padding: "5px 10px",
    fontSize: "12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    marginTop: "20px",
    textDecoration: "none",
    color: "#007BFF",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <h2>Tasks by Date Range</h2>
      <form onSubmit={(e) => handleSubmit(e)} style={formStyle}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Fetch Tasks
        </button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
      <h3>Tasks:</h3>
      {tasks.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {tasks.map((task) => (
            editDate===task.date?
            <>
                <form onSubmit={(e) => handleEditTask(e)}>
                    <textarea
                        style={EditinputStyle}
                        maxLength={2048}
                        placeholder="Enter the task(s) done today"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button style={buttonStyle} disabled={editContent === task.task}>
                        Submit
                    </button>
                    <button type="button" onClick={()=>{setEditDate("");setEditContent("")}} style={{...buttonStyle,backgroundColor:"grey"}} >
                        cancel
                    </button>
                </form>
            </>
            :
            <div key={task.date} style={taskContainerStyle}>
              <div style={taskDetailsStyle}>
                <p style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}>Task: {task.task}</p>
                <p style={{ margin: "0", fontSize: "12px", color: "#555" }}>
                  Date: {new Date(task.date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <button
                onClick={() => {setEditDate(task.date);setEditContent(task.task)}}
                style={buttonEditStyle}
              >
                Edit
              </button>
            </div>    
            
          ))}
        </div>
      ) : (
        <p>No tasks found for the selected range.</p>
      )}
      <Link to="/DT" style={linkStyle}>
        Go Back to the Landing Page
      </Link>
    </div>
  );
}

