import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import "../styles/layout.css";

function MyTasks() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
      return;
    }

    fetch(`http://localhost:8080/tasks/my?email=${user.email}`)
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:8080/tasks/update/${id}?status=${status}`, {
      method: "POST"
    }).then(() => {
      setTasks(tasks.map(t =>
        t.id === id ? { ...t, status } : t
      ));
    });
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>🏢 Office Portal</h2>
        <p className="side-email">{user.email}</p>

        <div className="nav-item" onClick={() => window.location.href="/dashboard"}>
          Dashboard
        </div>
        <div className="nav-item active">My Tasks</div>

        <button className="side-logout" onClick={() => {
          localStorage.clear();
          window.location.href="/";
        }}>
          Logout
        </button>
      </aside>

      <main className="content">
        <h1>My Tasks</h1>

        {tasks.map(task => (
          <div key={task.id} className="card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><b>Status:</b> {task.status}</p>

            {task.status !== "COMPLETED" && (
              <button
                onClick={() => updateStatus(task.id, "COMPLETED")}
                className="side-logout"
              >
                Mark Completed
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

export default MyTasks;
