import './App.css'
import { Route, Routes } from 'react-router-dom'
import Excel from './components/excel'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/login'
import Signup from './components/signup/Signup'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Excel />} />

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      
      </Routes>
    </>
  )
}

export default App
