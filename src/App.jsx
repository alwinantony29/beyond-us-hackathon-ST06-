import './App.css'
import { Route, Routes } from 'react-router-dom'
import Excel from './components/excel'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/login'
import Signup from './components/signup/Signup'
import Footer from './components/footer'

function App() {

  return (
    <div className='flex flex-col'>
      <Navbar />
      <Excel />
      <Footer />
    </div>
  )
}

export default App
