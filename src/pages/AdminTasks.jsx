import { useEffect, useState } from "react";
import "../styles/layout.css";

function AdminTasks() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }

    fetch("http://localhost:8080/tasks/all")
      .then(res => res.json())
      .then(setTasks);
  }, []);

  return (
    <div className="layout">
      {/* SIDEBAR */}
      

      {/* CONTENT */}
      <main className="content">
        <h1>📋 All Tasks</h1>

        {tasks.length === 0 && <p>No tasks assigned yet.</p>}

        {tasks.map(task => (
          <div key={task.id} className="card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <p><b>Assigned To:</b> {task.assignedTo}</p>
            <p><b>Status:</b> {task.status}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default AdminTasks;
