import React from 'react'
import { useNavigate } from 'react-router-dom'
import SignOut from './SignOut'
import DeleteAccount from './DeleteAccount'
import './User.css' 

export default function User({ userObj }) {
  const navigate = useNavigate()

  if (!userObj) {
    navigate('/login') 
    return null
  }

  return (
    <div className="user-container">
      <h1 className="user-header">User Profile</h1>

      {}
      <div className="user-info">
        {userObj.photoURL && (
          <img src={userObj.photoURL} alt="User" className="user-image" />
        )}
        <p><strong>Display Name:</strong> {userObj.displayName || 'Not set'}</p>
        <p><strong>Email:</strong> {userObj.email}</p>
        <p><strong>UID:</strong> {userObj.uid}</p>
        <p><strong>Email Verified:</strong> {userObj.emailVerified ? 'Yes' : 'No'}</p>
      </div>

      {}
      <div className="user-actions">
        <SignOut changeUser={() => navigate('/login')} />
        <DeleteAccount changeUser={() => navigate('/login')} />
      </div>
    </div>
  )
}