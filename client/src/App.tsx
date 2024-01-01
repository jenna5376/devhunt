import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Footer from './components/Footer'
import './styles/global.scss'
import Upload from './pages/Upload'
import SignUp from './pages/SignUp'
import { useEffect, useState } from 'react'
import axios from 'axios'

const App: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/signin/success");
        console.log(response.data)
        setUser(response.data.user)
      } catch (err) {
        console.log(err);
      }
    }
    getUser()
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/upload" element={<Upload/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
