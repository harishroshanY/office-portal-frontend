import { useState } from "react";
import "../styles/dashboard.css";

function AssignTask() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    await fetch("http://localhost:8080/tasks/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        assignedTo,
        description,
        assignedBy: user.email
      })
    });

    alert("Task Assigned");
    setTitle(""); setAssignedTo(""); setDescription("");
  };

  return (
    <>
      <h1>Assign Task</h1>

      <div className="card form-card">
        <input placeholder="Task Title" value={title}
          onChange={e => setTitle(e.target.value)} />

        <input placeholder="Assign To (Email)" value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)} />

        <textarea placeholder="Description" value={description}
          onChange={e => setDescription(e.target.value)} />

        <button className="primary-btn" onClick={submit}>
          Assign Task
        </button>
      </div>
    </>
  );
}

export default AssignTask;
