import React from 'react'
import { useDispatch } from 'react-redux'
import auth from '../../Appwrite/authService'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    function logoutHandler() {
        auth.logout()
        .then(() => dispatch(logout()))
        .catch(err => console.error("logout Error", err))
    }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn