import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Footer from './components/Footer'
import './styles/global.scss'
import Upload from './pages/Upload'
import SignUp from './pages/SignUp'

const App: React.FC = () => {
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
