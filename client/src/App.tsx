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
import Settings from "./pages/Settings"
import { User } from "./models/models"

const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

 useEffect(() => {
    axios(
      {
        method: "GET",
        url: "http://localhost:4000/auth/signin/success",
        withCredentials:true,
      }
    ).then(res => {
      setUser(res.data.user)
    })
  }, [])

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user}/>}></Route>
        <Route path="/upload" element={<Upload user={user} />}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        {user && <Route path="/profile/:category?" element={<Profile user={user} setUser={setUser}/>}></Route>}
        {user && <Route path="/settings" element={<Settings user={user}/>}></Route>}
      </Routes>
      <Footer />
    </>
  )
}

export default App
