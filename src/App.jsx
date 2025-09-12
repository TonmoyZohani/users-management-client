import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Handle form submit
  const handleAddUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const newUser = {
      name,
      email,
    };

    // clear form
    form.reset();

    // send to backend
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add user");
        }
        return res.json();
      })
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        setMessage("User added successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Error:", err);
        setMessage("Error adding user. Please try again.");
        setTimeout(() => setMessage(""), 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">Users Management System</h1>
          <p className="app-subtitle">
            Manage your users efficiently with our modern interface
          </p>
          <div className="app-stats">
            <span className="stat-badge">
              Total Users: {users.length}
            </span>
            <Link
              to="/user"
              className="view-users-btn"
            >
              View All Users
            </Link>
          </div>
        </div>

        {/* Add User Form */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">Add New User</h2>
            <p className="form-description">Fill in the details below to add a new user</p>
          </div>

          {message && (
            <div className={`message-alert ${
              message.includes("Error") ? "error" : "success"
            }`}>
              <div className="message-alert-icon">
                {message.includes("Error") ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="message-alert-text">
                {message}
              </div>
            </div>
          )}

          <form onSubmit={handleAddUser} className="user-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter full name"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-submit">
              <button
                type="submit"
                disabled={isLoading}
                className="submit-btn"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner"></div>
                    Adding User...
                  </div>
                ) : (
                  "Add User"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Users Preview */}
        {users.length > 0 && (
          <div className="users-preview">
            <div className="preview-header">
              <h3 className="preview-title">Recent Users</h3>
              <Link
                to="/user"
                className="view-all-link"
              >
                View all →
              </Link>
            </div>
            <div className="users-grid">
              {users.slice(0, 6).map((user) => (
                <div key={user._id} className="user-card">
                  <div className="user-avatar">
                    <span>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="user-info">
                    <p className="user-name">
                      {user.name || 'Unknown'}
                    </p>
                    <p className="user-email">
                      {user.email || 'No email'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
