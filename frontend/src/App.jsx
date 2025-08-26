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


function App() {
  const user = true;
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
      path: "/post/:postId",
      element: <><Navbar/><IndividualPage/></>
    },
    
  ])

  return (
    <>
    <RouterProvider router={router} />
    {}
    </>
  )
}

export default App
