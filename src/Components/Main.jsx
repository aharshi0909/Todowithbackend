import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { app } from '../config' 
import './Main.css' 

const db = getFirestore(app)

export default function Main({ userObj }) {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    if (!userObj) {
      navigate('/login')
    } else {
      fetchTasks() 
    }
  }, [userObj, navigate])

  
  const fetchTasks = async () => {
    if (!userObj) return

    setIsLoading(true)
    const tasksCollection = collection(db, userObj.uid) 
    const tasksSnapshot = await getDocs(tasksCollection)
    const tasksData = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setTasks(tasksData)
    setIsLoading(false)
  }

  
  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, userObj.uid, taskId)
    await deleteDoc(taskDoc)
    fetchTasks() 
  }

  return (
    <div className="container">
      {}
      <div className="top-bar">
        <button className="create-button" onClick={() => navigate('/create')}>
          Create New Task
        </button>
        <button className="user-button" onClick={() => navigate('/user')}>
          User
        </button>
      </div>

      {}
      <div className="user-header">
        {userObj?.photoURL && (
          <img src={userObj.photoURL} alt="User" className="user-image" />
        )}
        <h1 className="header">Your To-Do List</h1>
      </div>

      {}
      {isLoading ? (
        <div className="spinner"></div> 
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3 className="task-name">{task.taskName}</h3>
              <p className="task-date"><strong>Date:</strong> {task.date}</p>
              <p className="task-description"><strong>Description:</strong> {task.description}</p>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}