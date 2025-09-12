// File: Users.jsx
import React, { useState } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import "./Users.css";

function Users() {
  const users = useLoaderData();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);
  const [usersList, setUsersList] = useState(users);

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    setDeletingId(userId);

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove user from local state
      setUsersList(usersList.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="users-page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">Users Management System</h1>
          <p className="subtitle">
            Total Users: <span className="count">{usersList.length}</span>
          </p>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="card-header">
            <h2>Users List</h2>
          </div>

          {usersList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg
                  className="icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="empty-title">No users found</h3>
              <p className="empty-text">
                Get started by adding your first user.
              </p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, index) => (
                    <tr
                      key={user._id || index}
                      className={index % 2 === 0 ? "row-even" : "row-odd"}
                    >
                      <td className="id-cell">#{user._id || index + 1}</td>
                      <td>
                        <div className="name-cell">
                          <div className="avatar">
                            <span className="avatar-letter">
                              {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}
                            </span>
                          </div>
                          <div className="name-text">
                            {user.name || "Unknown"}
                          </div>
                        </div>
                      </td>
                      <td className="email-cell">
                        {user.email || "No email provided"}
                      </td>
                      <td>
                        <span className="badge">Active</span>
                      </td>
                      <td className="actions-cell">
                        <div className="action-buttons">
                          <Link
                            to={`/update/${user._id}`}
                            className="edit-btn"
                            title="Edit user"
                          >
                            <svg
                              className="edit-icon"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={deletingId === user._id}
                            className={`delete-btn ${
                              deletingId === user._id ? "deleting" : ""
                            }`}
                            title="Delete user"
                          >
                            {deletingId === user._id ? (
                              <div className="delete-spinner"></div>
                            ) : (
                              <svg
                                className="delete-icon"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                                  clipRule="evenodd"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
