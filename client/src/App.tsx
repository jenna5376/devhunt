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
import { User,Post } from "./models/models"
import ProjectDetails from "./components/ProjectDetails"
import { useLocation } from "react-router-dom"

const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [update, setUpdate] = useState(new Date())
  const[id, setId] = useState("")
  const [edit, setEdit] = useState(false)
  const [post, setPost] = useState<Post>({title:"",image:"",category:"",creator:"",creatorAvatar:"",github:"",website:"",viewCount:0,likeCount:0,createdAt:new Date(),readme:0,_id:""});

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
  
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(() => {
    const initialTheme = localStorage.getItem('theme')
    if (initialTheme){
      const theme = initialTheme === 'dark' ? true : false
      return theme
    }
    return getCurrentTheme()
  })
  const addBodyClass = (className: string) => document.body.classList.add(className);
  const removeBodyClass = (className: string) => document.body.classList.remove(className);
  
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) addBodyClass('dark')
    else removeBodyClass('dark')
  }, [isDark])

  return (
    <div className="body">
      <Navbar user={user} isDark={isDark} setIsDark={setIsDark} />
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Home user={user} isDark={isDark} update={update} setUpdate={setUpdate}/>}></Route>
        {
          edit 
            ? user && <Route path="/upload" element={<Upload user={user} edit={edit} post={post} id={id} setEdit={setEdit}/>} />
            : user && post && <Route path="/upload" element={<Upload user={user} edit={edit} post={post} id={id} setEdit={setEdit}/>} />
        }
        <Route path="/sign-up" element={<SignUp isDark={isDark}/>}></Route>
        {user && <Route path="/profile/:category?" element={<Profile user={user} setUser={setUser} update={update} setUpdate={setUpdate}/>}></Route>}
        {user && <Route path="/settings" element={<Settings user={user}/>}></Route>}
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/post/:id" element={<ProjectDetails setUpdate={setUpdate} setEdit={setEdit} setPost={setPost} setId={setId}/>} />
        </Routes>
      )}
      <Footer isDark={isDark} />
    </div>
  )
}

export default App
