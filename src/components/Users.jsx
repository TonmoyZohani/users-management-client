// File: Users.jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './Users.css';

function Users() {
  const users = useLoaderData();

  return (
    <div className="users-page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">Users Management System</h1>
          <p className="subtitle">
            Total Users: <span className="count">{users.length}</span>
          </p>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="card-header">
            <h2>Users List</h2>
          </div>

          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="empty-title">No users found</h3>
              <p className="empty-text">Get started by adding your first user.</p>
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
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                      <td className="id-cell">#{user.id || index + 1}</td>
                      <td>
                        <div className="name-cell">
                          <div className="avatar">
                            <span className="avatar-letter">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                          </div>
                          <div className="name-text">{user.name || 'Unknown'}</div>
                        </div>
                      </td>
                      <td className="email-cell">{user.email || 'No email provided'}</td>
                      <td>
                        <span className="badge">Active</span>
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

