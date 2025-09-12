import { Facebook, X, Pinterest, Instagram, Search } from "@mui/icons-material";
import { NavLink } from 'react-router';
import { useState } from 'react';
import { useContext } from "react";
import { Context } from "../../context/Context";

const Navbar = () => {
  const [showDrop, setShowDrop] = useState(false);
  const {user, dispatch} = useContext(Context);

  const handleLogout = ()=>{
    dispatch({type: "LOGOUT"});
    window.location.replace("/");
  }
  return (
    <nav className="flex h-14 sticky top-0 z-10 bg-white">
      <div className="flex-3 flex justify-center items-center gap-2">
        <Facebook />
        <X />
        <Pinterest />
        <Instagram />
      </div>
      <div className="flex-6 flex justify-center items-center">
        <ul className="flex gap-7 text-xl">
          <li>
            <NavLink to="/">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink to="/write">
              WRITE
            </NavLink>
          </li>
          <li>
            {user && <button className="cursor-pointer" onClick={handleLogout}>LOGOUT</button>}
          </li>
        </ul>
      </div>
     {user ?  <div className="flex-3 flex gap-2 justify-center items-center">
        <div className="relative">
          <button onClick={() => setShowDrop(!showDrop)} id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-400 rounded-full md:me-0 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer" type="button">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={`${user.profilePic}`} alt="" />
          </button>

          {/* <!-- Dropdown menu --> */}
          <div id="dropdownAvatar" className={`z-10 ${showDrop ? "" : "hidden"} text-lg  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-54 dark:bg-gray-700 dark:divide-gray-600 absolute right-[20%] top-8.5`}>
            <div className="px-4 py-2 text-sm text-center text-gray-900 dark:text-white">
              <div>{user.username}</div>
              <div className="font-medium truncate">{user.email}</div>
            </div>
            <ul className="flex flex-col gap-1  text-sm text-start text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
              <li>
                <NavLink className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/write">
                  Write
                </NavLink>
              </li>
            </ul>
            <div className="">
              <NavLink className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/settings">
                Settings
              </NavLink>
            </div>
            <div className=" flex justify-start">
              <button className="block w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:rounded-md cursor-pointer text-start" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="cursor-pointer text-gray-500">
          <Search />
        </div>

      </div> : (
        <ul className="flex-3 flex gap-3 text-xl justify-center items-center ">
          <li className="hover:text-teal-700">
            <NavLink to="/login">
              LOGIN
            </NavLink>
          </li>
          <li className="hover:text-red-500">
            <NavLink to="/register">
              REGISTER
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
