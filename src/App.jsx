import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import auth from "./Appwrite/authService"
import { login, logout } from "./store/authSlice"
import { Footer, Header, Loader, PostForm, SignUp } from "./components"
import { Outlet } from "react-router-dom"

import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() =>{
    auth.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      }else dispatch(logout())
    })
    .catch(err => console.error("current user get :: error", err))
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block h-full">
      <Header />
      <main>
       <Outlet />
      </main>
      <Footer />
    </div>
    </div>
  ) : <div className="h-[80vh]"><Loader /></div>
}

export default App
