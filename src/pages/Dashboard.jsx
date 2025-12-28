import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
      return;
    }

    let interval;

    Promise.all([
      fetch(`http://localhost:8080/work/active?email=${user.email}`).then(r => r.json()),
      fetch(`http://localhost:8080/work/today?email=${user.email}`).then(r => r.json())
    ]).then(([activeLog, todayMinutes]) => {
      const base = todayMinutes * 60;

      if (activeLog && activeLog.loginTime) {
        const loginTime = new Date(activeLog.loginTime);

        interval = setInterval(() => {
          const current =
            base + Math.floor((Date.now() - loginTime.getTime()) / 1000);

          setSeconds(current);

          // 🔔 send time to sidebar
          if (window.onTimerUpdate) {
            window.onTimerUpdate(current);
          }
        }, 1000);
      } else {
        setSeconds(base);
        if (window.onTimerUpdate) {
          window.onTimerUpdate(base);
        }
      }
    });

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}h ${m}m ${s}s`;
  };

  const completed = seconds >= 32400;

  return (
    <>
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>⏱ Working Time</h3>
          <p className="timer">{formatTime()}</p>
        </div>

        <div className={`card status ${completed ? "green" : "red"}`}>
          <h3>Status</h3>
          <p>{completed ? "Completed (9+ hrs)" : "Incomplete (< 9 hrs)"}</p>
        </div>

        <div className="card">
          <h3>👤 Role</h3>
          <p>{user.role}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
