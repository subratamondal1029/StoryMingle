import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({children, authentication = true}) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const authStatus = useSelector((state) => state.authSlice.status)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login')
    }else if(!authentication && authStatus !== authentication){
      navigate('/')
    }
  }, [authentication, loader, authStatus])

  return loader ? "Loading..." : children
}

export default ProtectRoute