import './App.css'
import Excel from './components/excel'
import Navbar from './components/navbar/Navbar'
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
