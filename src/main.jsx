import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import {Home, AddPost, EditPost, Login, SignUp, Post} from "./pages/index.js"
import {ProtectRoute} from "./components"
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<ProtectRoute authentication={false}><Login /></ProtectRoute>}/>
      <Route path='/signup' element={<ProtectRoute authentication={false}><SignUp /></ProtectRoute>}/>
      <Route path='/add-post' element={<ProtectRoute authentication><AddPost /></ProtectRoute>}/>
      <Route path='/edit-post' element={<ProtectRoute authentication><EditPost /></ProtectRoute>}/>
      <Route path='/edit-post/:slug' element={<ProtectRoute authentication><EditPost /></ProtectRoute>}/>
      <Route path='/post/:slug' element={<ProtectRoute authentication><Post /></ProtectRoute>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
