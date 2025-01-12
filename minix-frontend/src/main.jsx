import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Homepage from './pages/Homepage/Homepage.jsx'
import AllPosts from './pages/AllPosts/AllPosts.jsx'
import MyPosts from './pages/MyPosts/MyPosts.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import { AuthProvider } from './layout/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} >
            <Route index element={<AllPosts />} />
            <Route
              path='myposts/:handle'
              element={<MyPosts />}
              // loader={({ params }) => fetch(`${import.meta.env.VITE_API_LINK}/post/user/${params.handle}`)}
            />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode >,
)
