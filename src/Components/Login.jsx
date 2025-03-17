import React, { useState, useEffect } from 'react'
import { config } from '../config'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './Login.css' 

const app = initializeApp(config)
const auth = getAuth(app)

export default function Login({ changeUser }) {
  const [inpType, setInpType] = useState('password')
  const [err, setErr] = useState('')
  const [userData, setUserData] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        changeUser(user)
        setUserData(user)
      } else {
        changeUser(null)
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [changeUser])

  const handleAuth = () => {
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          changeUser(user)
          setUserData(user)
          setIsNewUser(true)
          navigate('/main')
        })
        .catch((error) => {
          console.error("Sign-Up Error:", error.code, error.message)
          setErr(error.message)
        })
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          changeUser(user)
          setUserData(user)
          setIsNewUser(false)
          navigate('/main')
        })
        .catch((error) => {
          console.error("Login Error:", error.code, error.message)
          setErr(error.message)
        })
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-header">{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <div className="input-container">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" required/>
        <div className="password-container">
          <input type={inpType} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required/>
          <button className="see-button" onClick={() => setInpType(inpType === 'password' ? 'text' : 'password')}>
            {inpType === 'password' ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>
      <button className="auth-button" onClick={handleAuth}>
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
      </button>
      {err && <p className="error-message">{err}</p>}
    </div>
  )
}