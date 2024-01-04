import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/index"
import Footer from "./components/Footer"
import "./styles/global.scss"
import Upload from "./pages/Upload"
import SignUp from "./pages/SignUp"
import { useEffect, useState } from "react"
import axios from "axios"
import Profile from "./pages/Profile/index"

const App: React.FC = () => {
  const [user, setUser] = useState(null);

 useEffect(() => {
    axios(
      {
        method: "GET",
        url: "http://localhost:4000/auth/signin/success",
        withCredentials:true,
      }
    ).then(res => {
      console.log(res)
      setUser(res.data.user)
    })
  }, [])

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/upload" element={<Upload/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
