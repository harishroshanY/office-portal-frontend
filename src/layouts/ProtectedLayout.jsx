import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/layout.css";

function ProtectedLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showWarning, setShowWarning] = useState(false);
  const [workedSeconds, setWorkedSeconds] = useState(0);

  if (!user) {
    navigate("/");
    return null;
  }

  // 🔔 Receive live timer from Dashboard
  window.onTimerUpdate = (sec) => {
    setWorkedSeconds(sec);
  };

  const isCompleted = workedSeconds >= 32400; // 9 hours

  const doLogout = async () => {
    await fetch(
      `http://localhost:8080/work/end?email=${user.email}`,
      { method: "POST" }
    );

    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <h2>🏢 Office Portal</h2>
        <p className="side-email">{user.email}</p>

        <div className="nav-item" onClick={() => navigate("/dashboard")}>
          Dashboard
        </div>

        {user.role === "ADMIN" && (
          <>
            <div className="nav-item" onClick={() => navigate("/admin")}>
              Admin Dashboard
            </div>

            <div className="nav-item" onClick={() => navigate("/assign-task")}>
              Assign Task
            </div>
          </>
        )}

        <button
          className="side-logout"
          onClick={() => {
            if (!isCompleted) setShowWarning(true);
            else doLogout();
          }}
        >
          Logout
        </button>
      </aside>

      {/* ===== PAGE CONTENT ===== */}
      <main className="content">
        <Outlet />
      </main>

      {/* ===== LOGOUT WARNING MODAL ===== */}
      {showWarning && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>⚠️ Warning</h3>
            <p>9 hours not completed. Still want to logout?</p>

            <div className="modal-actions">
              <button className="danger" onClick={doLogout}>
                Yes, Logout
              </button>
              <button onClick={() => setShowWarning(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProtectedLayout;
