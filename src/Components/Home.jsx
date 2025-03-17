import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Task Manager</h1>
        <p className="hero-subtitle">Organize your tasks and boost your productivity.</p>
        <button className="signin-button" onClick={() => navigate('/login')}>
          Sign In
        </button>
      </div>

      <div className="features-section">
        <h2 className="features-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img
              src="https://source.unsplash.com/400x300/?task,planner"
              alt="Task Management"
              className="feature-image"
            />
            <h3>Task Management</h3>
            <p>Easily create, update, and delete tasks.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://source.unsplash.com/400x300/?calendar,plan"
              alt="Calendar Integration"
              className="feature-image"
            />
            <h3>Calendar Integration</h3>
            <p>Sync your tasks with your calendar.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://source.unsplash.com/400x300/?collaboration,team"
              alt="Team Collaboration"
              className="feature-image"
            />
            <h3>Team Collaboration</h3>
            <p>Work together with your team on shared tasks.</p>
          </div>
        </div>
      </div>
    </div>
  )
}