import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { app } from '../config' 
import './CreateTask.css' 

const db = getFirestore(app)

export default function CreateTask({ userObj }) {
  const navigate = useNavigate()
  const [taskName, setTaskName] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!taskName || !date || !description) {
      setError('Please fill in all fields')
      return
    }

    try {
      const tasksCollection = collection(db, userObj.uid) 
      await addDoc(tasksCollection, {
        taskName,
        date,
        description,
        completed: false, 
      })
      navigate('/main') 
    } catch (err) {
      console.error('Error adding task:', err)
      setError('Failed to add task. Please try again.')
    }
  }

  return (
    <div className="create-task-container">
      <h1 className="create-task-header">Create New Task</h1>

      {}
      {error && <p className="error-message">{error}</p>}

      {}
      <form onSubmit={handleSubmit} className="create-task-form">
        <input required type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="form-input"/>
        <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input"/>
        <textarea required placeholder="Task Description" value={description}onChange={(e) => setDescription(e.target.value)} className="form-textarea"/>
        <button type="submit" className="create-task-button">Add Task</button>
      </form>
    </div>
  )
}