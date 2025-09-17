import Navbar from './components/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Write from './pages/Write'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import IndividualPage from './pages/IndividualPage'
import { useContext } from 'react'
import { Context } from './context/Context'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import BackToTop from './components/ui/BackToTop'
import ReadingProgress from './components/ui/ReadingProgress'


function App() {
  const {user} = useContext(Context);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/></>,
    },
    {
      path: "/contact",
      element: <><Navbar/><Contact/></>
    },
    {
      path: "/about",
      element: <><Navbar/><About/></>
    },
    {
      path: "/write",
      element: <>{user ? <><Navbar/><Write/></> : <><Navbar/><Register/></> }</>
    },
    {
      path: "/settings",
      element: <>{user ? <><Navbar/><Settings/></> : <><Navbar/><Register/></> }</>
    },
    {
      path: "/login",
      element: <>{user ? <><Navbar/><Home/></> : <><Navbar/><Login/></> }</>
    },
    {
      path: "/register",
      element: <>{user ? <><Navbar/><Home/></> : <><Navbar/><Register/></> }</>
    },
    {
      path: "/posts/:postId",
      element: <><Navbar/><IndividualPage/></>
    },
    
  ])

  return (
    <ThemeProvider>
      <ToastProvider>
        <ReadingProgress />
        <RouterProvider router={router} />
        <BackToTop />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
