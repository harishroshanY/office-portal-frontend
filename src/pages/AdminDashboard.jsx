import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/work/admin/today")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <>
      <h1>Admin Dashboard</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Worked Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u, i) => (
            <tr key={i}>
              <td>{u.email}</td>
              <td>{Math.floor(u.minutes / 60)}h {u.minutes % 60}m</td>
              <td className={u.minutes >= 540 ? "green" : "red"}>
                {u.minutes >= 540 ? "Completed" : "Incomplete"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminDashboard;
