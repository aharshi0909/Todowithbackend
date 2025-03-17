import React from 'react'
import { getAuth, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { getFirestore, deleteDoc, collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { app } from '../config'

const auth = getAuth(app)
const db = getFirestore(app)

export default function DeleteAccount({ changeUser }) {
  const navigate = useNavigate()

  const handleDeleteAccount = () => {
    const user = auth.currentUser

    if (user) {
      const password = prompt("Please enter your password to confirm account deletion:")
      if (!password) {
        alert("Password is required for account deletion.")
        return
      }

      const credential = EmailAuthProvider.credential(user.email, password)

      reauthenticateWithCredential(user, credential)
        .then(() => {
          const userCollectionRef = collection(db, user.uid)

          getDocs(userCollectionRef)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
              })
            })
            .then(() => {
              deleteUser(user)
                .then(() => {
                  changeUser()
                  navigate('/login')
                })
                .catch((error) => {
                  console.error("Account Deletion Error:", error.code, error.message)
                  alert(error.message)
                })
            })
            .catch((error) => {
              console.error("Error deleting collection:", error)
              alert("Failed to delete user data.")
            })
        })
        .catch((error) => {
          console.error("Reauthentication Error:", error.code, error.message)
          alert(error.message)
        })
    } else {
      alert("No user is currently signed in.")
    }
  }

  return (
    <button className="delete-button" onClick={handleDeleteAccount}>Delete Account</button>
  )
}