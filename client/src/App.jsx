import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}>
            <Route index element={<Signup />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
